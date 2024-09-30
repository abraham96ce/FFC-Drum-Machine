/**
 * App.tsx
 * 
 * Este componente representa la aplicación principal de la máquina de ritmos.
 * Permite al usuario reproducir diferentes sonidos de batería mediante botones y
 * mediante la interacción con el teclado. Además, incluye un control deslizante
 * para ajustar el volumen de los sonidos.
 * 
 * Componentes utilizados:
 * - DrumMachine: Componente que representa un pad de batería individual.
 * 
 * Funcionalidad:
 * 
 * 1. Carga una lista de clips de audio, cada uno asociado con una tecla específica.
 * 2. Mantiene el estado del volumen utilizando el hook useState.
 * 3. Reproduce el sonido correspondiente al presionar una tecla del teclado.
 * 4. Permite al usuario ajustar el volumen mediante un control deslizante.
 * 5. Muestra la descripción del sonido actualmente reproduciéndose en un elemento de visualización.
 * 
 * Ejemplo de uso:
 * 
 * Este componente se puede utilizar directamente como la entrada principal en una
 * aplicación React, y se renderizará como una máquina de ritmos funcional.
 */

import React, { useState } from 'react';
import { Audio } from './Types';
import DrumMachine from './DrumMachine';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const audio: Audio[] = [
  { keyTrigger: 'Q', description: 'Heater-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { keyTrigger: 'W', description: 'Heater-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { keyTrigger: 'E', description: 'Heater-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { keyTrigger: 'A', description: 'Heater-4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { keyTrigger: 'S', description: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { keyTrigger: 'D', description: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { keyTrigger: 'Z', description: "Kick-n'-Hat", url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { keyTrigger: 'X', description: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { keyTrigger: 'C', description: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },

]

function App() {
  const [volume, setVolume] = useState(0); // Estado para el volumen
   /**
   * Maneja la reproducción de audio al presionar una tecla del teclado.
   * 
   * @param e - El evento de teclado.
   */
  const playAudio = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const clip = audio.find((clip) => clip.keyTrigger === e.key.toUpperCase());
    if(!clip) return; // Si no hay un clip correspondiente, sale de la función.

    const audioElement = document.getElementById(clip.keyTrigger) as HTMLAudioElement;
    audioElement.volume = volume; //Ajusta el volumen
    audioElement.play().catch(console.error); // Reproduce el sonido y maneja errores
    //(document.getElementById(clip.keyTrigger) as HTMLAudioElement).play().catch(console.error);
    document.getElementById("drum-" +clip.keyTrigger)?.focus();// Enfoca el botón del pad
    document.getElementById("display")!.innerText = clip.description;// Actualiza la descripción
  }

  /**
   * Maneja el cambio en el control deslizante de volumen.
   * 
   * @param e - El evento de cambio del input.
   */
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value)); // Actualiza el estado del volumen
    };

  return (
    <div className="container text-center mt-5" id='drum-machine' onKeyDown={playAudio}>
      <h1 className="mb-4 display-4">Drum Machine</h1>
      <div className='whole-drum mb-4'>
        {audio.map((clip) => (
          <DrumMachine audio = {clip} volume={volume} key={clip.keyTrigger}/>
        ))}
      </div>
      <div className="mt-4">
        <label htmlFor="volume" className="volume-label">Volumen: {Math.round(volume * 100)}%</label>
        <input type="range" id="volume" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="form-range"/>
      </div>
      <div id = "display" className="mt-4 alert alert-info"></div>
    </div>
  );
}

export default App;
