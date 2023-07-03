import React, { Fragment, useEffect, useState } from 'react';
import Interface from "./Interface";
import './App.css';
import { _0x1602b4, _0x231437, _0x41c30c } from './utils/functions';

const sleep = (t) => new Promise((resolve) => setTimeout(() => resolve(true), t));
// const randomPlayer = () => Math.random() > 0.5 ? "X" : "O";

const initialCells = new Array(9).fill("");

const initialConfig = {
    FirstLine: "on",
    SecondLine: "on",
    ThirdLine: "on"
}

export default function App() {

    const [roundIA, setRoundIA] = useState(false);
    const [atualPlayer, setAtualPlayer] = useState("X");
    const [cells, setCells] = useState(initialCells);
    const [colors, setColors] = useState(initialCells);
    const [config, setConfig] = useState(initialConfig);
    const [singlePlayer, setSinglePlayer] = useState(true);
    const [difficulty, setDifficulty] = useState("FACIL");

    const contrastCellsAsWin = (line) => {
        setColors(prev => {
            prev[line[0]] = "_5cc51f";
            prev[line[1]] = "_5cc51f";
            prev[line[2]] = "_5cc51f";
            return [...prev]
        })
    }

    const contrastCellsAsTie = () => {
        setColors(new Array(9).fill("_d3332a"))
    }

    const changePlayer = () => {
        setAtualPlayer((prev) => {
            return prev === "X" ? "O" : "X"
        })
    }

    const MovementIA = () => {
        const _cells = JSON.parse(JSON.stringify(cells));
        const _config = JSON.parse(JSON.stringify(config));
        const [__arr, __config] = _0x1602b4(_cells, _config, difficulty);
        setCells(__arr);
        setConfig(__config);
        setRoundIA(false);
    }

    const resetConfigs = () => {
        setCells(new Array(9).fill(""));
        setColors(new Array(9).fill(""));
        setConfig({ ...initialConfig });
        setAtualPlayer("X");
    }

    useEffect(() => {
        if (cells.find((e) => e !== "")) {
            _0x231437(cells, atualPlayer).then((win) => {
                if (win) {
                    contrastCellsAsWin(win);
                    sleep(100)
                        .then(() => { alert(`Vitória do jogador: ${atualPlayer}`); resetConfigs() })
                } else if (_0x41c30c(cells)) {
                    contrastCellsAsTie();
                    sleep(100)
                        .then(() => { alert("Empate!!!"); resetConfigs() })
                } else {
                    changePlayer();
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cells])

    useEffect(() => {
        if (cells.filter((e) => e !== "").length !== 0) {
            if (singlePlayer && atualPlayer === "O") {
                setRoundIA(true)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [atualPlayer])

    useEffect(() => {
        if (roundIA) {
            MovementIA()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roundIA])

    useEffect(() => {
        resetConfigs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [difficulty])

    const setPlay = (i) => {
        if (cells[i] === "") {
            setCells((prev) => {
                prev[i] = atualPlayer;
                return [...prev]
            });
        }
    }

    return (
        <div className="App">
            {singlePlayer && (
                <Fragment>
                    <div className="button-container">
                        <button className={`button ${difficulty === "FACIL" ? "buttonActive" : ""}`} onClick={e => setDifficulty("FACIL")}>Fácil</button>
                        <button className={`button ${difficulty === "NORMAL" ? "buttonActive" : ""}`} onClick={e => setDifficulty("NORMAL")}>Normal</button>
                        <button className={`button ${difficulty === "DIFICIL" ? "buttonActive" : ""}`} onClick={e => setDifficulty("DIFICIL")}>Difícil</button>
                        <button className={`button ${difficulty === "IMPOSSIVEL" ? "buttonActive" : ""}`} onClick={e => setDifficulty("IMPOSSIVEL")}>Impossível</button>
                    </div>
                    <Interface cells={cells} click={setPlay} colors={colors} />
                </Fragment>
            )}
            {!singlePlayer && (
                <Fragment>
                    <div className="atual-player">{atualPlayer}</div>
                    <Interface cells={cells} click={setPlay} colors={colors} />
                </Fragment>
            )}
            <button className="button" onClick={e => { resetConfigs(); setSinglePlayer(!singlePlayer); }}>Trocar Modo</button>
        </div>
    );
}