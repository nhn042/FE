/* eslint-disable no-undef */
import './Search.css'
import '../Definitions/Definitions.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Definitions from '../Definitions/Definitions.js';
import {FaVolumeUp, FaMicrophone} from 'react-icons/fa';
import categories from "../../data/category";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()
    mic.continuous = true
    mic.interimResults = true
    mic.lang = 'vi-VI'
function Search() {
    const [isListening, setIsListening] = useState(false)
    const [word, setWord] = useState("");
    const [category, setCategory] = useState('Viet');
    const [meanings, setMeanings] = useState([]);
    const [response, setResponse] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        handleListen()
      }, [isListening])

      const handleListen = () => {
        if (isListening) {
          mic.start()
          mic.onend = () => {
            console.log('continue..')
            mic.start()
          }
        } else {
          mic.stop()
          mic.onend = () => {
            console.log('Stopped Mic on Click')
          }
        }
        mic.onstart = () => {
          console.log('Mics on')
        }
    
        mic.onresult = event => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
          console.log(transcript)
          setWord(transcript)
          mic.onerror = event => {
            console.log(event.error)
          }
        }
      }

      // const handleSaveNote = () => {
      //   setSavsedNotes([...savedNotes, word])
      //   setWord('')
      // }
    const reset = () => {
      setMeanings([]);
      setWord("")
      setResponse(false)
    }
    const handleSubmit = async e => {
      try {
        e.preventDefault();
        axios.get(`http://localhost:8080/dictionary/${category}?query=${word}`, word)
        .then(res => {
            console.log(res.data);
            setMeanings(res.data);
            setResponse(true);
        })
      } catch (err) {
        setError(err);
      }
    }
    useEffect(() => {
        if(!word.trim()) return reset();
        const debouce = setTimeout(() => {
        }, 1000)
        return () => clearTimeout(debouce)
    }, [word, category])

    if(error) {
      return <h3>No Definitions Found 😥</h3>
    }

    console.log(meanings.listSequenceText);
    return (
      <div>
        <h2 className='header'>DICTIONARY</h2>
        <div className="panel">
          <div className="right-panel">
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((option, index) => (
                  <option key={index}>{option.value}</option>
                ))}
              </select>
            </div>
            <div className="search-box">
              <textarea
                placeholder="Search..."
                value={word}
                onChange={(e) => setWord(e.target.value)}
              ></textarea>
              <span
                onClick={() => setIsListening((prevState) => !prevState)}
                className="microphone"
              >
                <FaMicrophone />
              </span>
              <span className="volume">
                <FaVolumeUp />
              </span>
            </div>
          </div>
         <div className="left-panel">
            <div>
              <select>
                <option value="Tay">Tay</option>
                <option value="Viet">Viet</option>
              </select>
            </div>      
            {
            category === "Viet" && (meanings.listSequenceText ?
            (
              <div className='box-meaning'> 
                  {
                      meanings.listSequenceText?.map((meaning, index) =>(
                              <div key={index}>
                                      <p className='contain'>
                                      - {meaning}
                                      </p>
                              </div>
                      ))

                  }
              </div>
            )
              :
              (
              <div className='box-meaning'> 
                  {
                      meanings.map((meaning, index) =>(
                              <div key={index} className='contain'>
                                      <p>
                                      - {meaning.idTay.word} 
                                      </p>
                              </div>
                      ))
                  }
              </div>
              )
              )}
            {
            category === "Tay" && (meanings.listSequenceText ?
              (
                <div className='box-meaning'> 
                    {
                        meanings.listSequenceText?.map((meaning, index) =>(
                                <div key={index}>
                                        <p className='contain'>
                                        - {meaning}
                                        </p>
                                </div>
                        ))
  
                    }
                </div>
              )
              :
              (
          <div className='box-meaning'> 
                  {
                      meanings.map((meaning, index) =>(
                              <div key={index} className='contain'>
                                      <p>
                                      - {meaning.idVi.word} 
                                      </p>
                              </div>
                      ))
                  }
            </div>
            )
            )}
          </div>
        </div>
        <div className="button">
          <button className="search" onClick={handleSubmit}>
            {" "}
            Search{" "}
          </button>
        </div>
        
        {
          !meanings.listSequenceText && response && (
          <Definitions word={word} meanings={meanings} /> 
        )}
      </div>
    );
}

export default Search;
