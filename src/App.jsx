import React, { useState, useEffect } from 'react';
import './App.css';

const Calculator = () => {
    const [theme, setTheme] = useState(false);
    const [display, setDisplay] = useState('');

    const toggleTheme = () => {
        setTheme(!theme);
    };

    const appendToDisplay = (input) => {
        if (input === 'C') {
            setDisplay('');
        } else {
            setDisplay(display + input);
        }
    };

    const backspace = () => {
        setDisplay(display.slice(0, -1));
    };

    const calculate = () => {
        try {
            setDisplay(eval(display).toString());
        } catch (error) {
            setDisplay('Error');
        }
    };

    useEffect(() => {
        const cursor = document.querySelector('.cursor');

        const handleMouseMove = (e) => {
            let x = e.pageX;
            let y = e.pageY;

            cursor.style.top = y + 'px';
            cursor.style.left = x + 'px';
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className={`calculator ${theme ? 'dark' : ''}`}>
            <div className="theme-toggler active" onClick={toggleTheme}>
                <i className={`toggler-icon ${theme ? 'dark' : ''}`}></i>
            </div>
            <div className="display-screen">
                <div id="display">{display}</div>
            </div>
            <div className="buttons">
                <table>
                    <tbody>
                        <tr>
                            <td><button className="btn-operator" onClick={() => appendToDisplay('C')}>C</button></td>
                            <td><button className="btn-operator" onClick={() => appendToDisplay('/')}>÷</button></td>
                            <td><button className="btn-operator" onClick={() => appendToDisplay('*')}>×</button></td>
                            <td><button className="btn-operator" onClick={backspace}>&lt;</button></td>
                        </tr>
                        <tr>
                            <td><button className="btn-number" onClick={() => appendToDisplay('7')}>7</button></td>
                            <td><button className="btn-number" onClick={() => appendToDisplay('8')}>8</button></td>
                            <td><button className="btn-number" onClick={() => appendToDisplay('9')}>9</button></td>
                            <td><button className="btn-operator" onClick={() => appendToDisplay('-')}>-</button></td>
                        </tr>
                        <tr>
                            <td><button className="btn-number" onClick={() => appendToDisplay('4')}>4</button></td>
                            <td><button className="btn-number" onClick={() => appendToDisplay('5')}>5</button></td>
                            <td><button className="btn-number" onClick={() => appendToDisplay('6')}>6</button></td>
                            <td><button className="btn-operator" onClick={() => appendToDisplay('+')}>+</button></td>
                        </tr>
                        <tr>
                            <td><button className="btn-number" onClick={() => appendToDisplay('1')}>1</button></td>
                            <td><button className="btn-number" onClick={() => appendToDisplay('2')}>2</button></td>
                            <td><button className="btn-number" onClick={() => appendToDisplay('3')}>3</button></td>
                            <td rowSpan="2"><button className="btn-equal" onClick={calculate}>=</button></td>
                        </tr>
                        <tr>
                            <td><button className="btn-operator" onClick={() => appendToDisplay('(')}>(</button></td>
                            <td><button className="btn-number" onClick={() => appendToDisplay('0')}>0</button></td>
                            <td><button className="btn-operator" onClick={() => appendToDisplay(')')}>)</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="cursor"></div>
        </div>
    );
};

export default Calculator;
