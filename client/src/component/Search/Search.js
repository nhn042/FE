/* eslint-disable no-undef */
import './Search.css'
import '../Definitions/Definitions.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Definitions from '../Definitions/Definitions.js';
import {FaVolumeUp, FaMicrophone} from 'react-icons/fa';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()
    mic.continuous = true
    mic.interimResults = true
    mic.lang = 'vi-VI'
function Search() {
    const [isListening, setIsListening] = useState(false)
    const [word, setWord] = useState("");
    const [meanings, setMeanings] = useState([]);

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

      const handleSaveNote = () => {
        setSavedNotes([...savedNotes, word])
        setWord('')
      }

    const handleSubmit = async e => {
        e.preventDefault();
        axios.get(`http://localhost:8080/dictionary?query=${word}`, word)
        .then(res => {
            console.log(res.data);
            setMeanings(res.data);
        })
    }
    useEffect(() => {
        if(!word.trim()) return;
        const debouce = setTimeout(() => {
        }, 1000)
        return () => clearTimeout(debouce)
    }, [word])

    return (
        <div>
            <h2>Dictionary</h2>
        <div className="panel">
            <div className="right-panel">
                <div>
                    <select>
                    <option value="tieng viet">Việt</option>
                    <option value="tieng tay">Tày</option>
                    </select>
                </div>
                <div className="search-box">
                    <textarea 
                    placeholder="Search..." 
                    value={word} 
                    onChange={e => setWord(e.target.value)}>
                    </textarea>
                    <span onClick={() => setIsListening(prevState => !prevState)} 
                    className='microphone'><FaMicrophone /></span>
                    <span className='volume'><FaVolumeUp /></span>
                </div>
            </div>
            <div className="left-panel">
            <div>
                    <select>
                    <option value="tieng viet">Tày</option>
                    <option value="tieng tay">Việt</option>
                    </select>
            </div>
            <textarea defaultValue={
                meanings.map((meanings, index) => (
                    meanings.translatedWord
                ))
            }/>

            </div>
        </div>
        <div className='button'>
        <button className='search' onClick={handleSubmit}> Search </button>
        </div>
            {(<Definitions word={word} meanings={meanings}/>)}
        </div>
    );
}

export default Search;
