import './stack.css';
import css from '../../assets/img/css-3.png';
import html from '../../assets/img/html-5.png';
import js from '../../assets/img/js.png';
import mongo from '../../assets/img/mongo.png';
import node from '../../assets/img/node.png';
import react from '../../assets/img/react.png';
import sqlite from '../../assets/img/sqlite.png';
import vscode from '../../assets/img/vscode.png';
import prestashop from '../../assets/img/prestashop.png'

function Stack() {
    return (
        <section id='stack'>
            <h2>Stack</h2>
            <div className='stack-list'>
                <img src={html} alt='html' />
                <img src={css} alt='css' />
                <img src={js} alt='js' />
                <img src={mongo} alt='mongo' />
                <img src={react} alt='react' />
                <img src={node} alt='node' />
                <img src={sqlite} alt='sqlite' />
                <img src={vscode} alt='vscode' />
                <img src={prestashop} alt='prestashop' />
            </div>
        </section>
    )
};

export default Stack;