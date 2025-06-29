import React, { useRef, useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

export default function App() {
  const intervalRef = useRef(null);
  const [ativo, setAtivo] = useState('');

  const enviarComando = async (comando) => {
    try {
      await fetch(`${API_URL}/comando?comando=${comando}`);
    } catch (e) {
      console.error("Erro ao enviar comando:", comando);
    }
  };

  const iniciarEnvio = (comando) => {
    if (intervalRef.current || ativo === comando) return;
    setAtivo(comando);
    enviarComando(comando);
    intervalRef.current = setInterval(() => enviarComando(comando), 500);
  };

  const pararEnvio = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setAtivo('');
  };

  useEffect(() => {
    const keyDownHandler = (e) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || e.key === 'ArrowUp') iniciarEnvio('frente');
      else if (key === 's' || e.key === 'ArrowDown') iniciarEnvio('tras');
      else if (key === 'a' || e.key === 'ArrowLeft') iniciarEnvio('esquerda');
      else if (key === 'd' || e.key === 'ArrowRight') iniciarEnvio('direita');
      else if (key === 'f') iniciarEnvio('farol');
      else if (key === 'b') iniciarEnvio('buzina');
      else if (key === 'j') iniciarEnvio('canhao-esquerda');
      else if (key === 'l') iniciarEnvio('canhao-direita');
      else if (key === 'k') iniciarEnvio('canhao-baixo');
      else if (key === 'i') iniciarEnvio('canhao-cima');
      else if (key === 'p') iniciarEnvio('fire');
    };

    const keyUpHandler = () => pararEnvio();

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, [ativo]);

  return (
    <div className="page">
      <header className="topo">
        <h1>
          Tank Control V.1.0 –{' '}
          <a
            href="https://www.instagram.com/br.lcsistemas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            by LC SISTEMAS
          </a>
        </h1>
      </header>

      <div className="container">
        <div className="controles">
          <button
            onMouseDown={() => iniciarEnvio('frente')}
            onMouseUp={pararEnvio}
            onMouseLeave={pararEnvio}
            className={`botao ${ativo === 'frente' ? 'ativo' : ''}`}
          >
            ⬆️
          </button>
          <div className="linha-meio">
            <button
              onMouseDown={() => iniciarEnvio('esquerda')}
              onMouseUp={pararEnvio}
              onMouseLeave={pararEnvio}
              className={`botao ${ativo === 'esquerda' ? 'ativo' : ''}`}
            >
              ⬅️
            </button>
            <button
              onMouseDown={() => iniciarEnvio('direita')}
              onMouseUp={pararEnvio}
              onMouseLeave={pararEnvio}
              className={`botao ${ativo === 'direita' ? 'ativo' : ''}`}
            >
              ➡️
            </button>
          </div>
          <button
            onMouseDown={() => iniciarEnvio('tras')}
            onMouseUp={pararEnvio}
            onMouseLeave={pararEnvio}
            className={`botao ${ativo === 'tras' ? 'ativo' : ''}`}
          >
            ⬇️
          </button>
        </div>

        <div className="extras">
          <button
            onMouseDown={() => iniciarEnvio('farol')}
            onMouseUp={pararEnvio}
            onMouseLeave={pararEnvio}
            className={`extra-botao ${ativo === 'farol' ? 'ativo' : ''}`}
          >
            Farol (F)
          </button>
          <button
            onMouseDown={() => iniciarEnvio('buzina')}
            onMouseUp={pararEnvio}
            onMouseLeave={pararEnvio}
            className={`extra-botao ${ativo === 'buzina' ? 'ativo' : ''}`}
          >
            Buzina (B)
          </button>
          <button
            onMouseDown={() => iniciarEnvio('canhao-cima')}
            onMouseUp={pararEnvio}
            onMouseLeave={pararEnvio}
            className={`extra-botao ${ativo === 'canhao-cima' ? 'ativo' : ''}`}
          >
            Canhão Cima (I)
          </button>
          <button
            onMouseDown={() => iniciarEnvio('canhao-baixo')}
            onMouseUp={pararEnvio}
            onMouseLeave={pararEnvio}
            className={`extra-botao ${ativo === 'canhao-baixo' ? 'ativo' : ''}`}
          >
            Canhão Baixo (K)
          </button>
          <button
            onMouseDown={() => iniciarEnvio('canhao-esquerda')}
            onMouseUp={pararEnvio}
            onMouseLeave={pararEnvio}
            className={`extra-botao ${ativo === 'canhao-esquerda' ? 'ativo' : ''}`}
          >
            Canhão Esquerda (J)
          </button>
          <button
            onMouseDown={() => iniciarEnvio('canhao-direita')}
            onMouseUp={pararEnvio}
            onMouseLeave={pararEnvio}
            className={`extra-botao ${ativo === 'canhao-direita' ? 'ativo' : ''}`}
          >
            Canhão Direita (L)
          </button>
          <button
            onMouseDown={() => iniciarEnvio('fire')}
            onMouseUp={pararEnvio}
            onMouseLeave={pararEnvio}
            className={`extra-botao vermelho ${ativo === 'fire' ? 'ativo' : ''}`}
          >
            Canhão Atirar (P)
          </button>
        </div>
      </div>
    </div>
  );
}
