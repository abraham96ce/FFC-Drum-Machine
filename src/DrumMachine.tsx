/**
 * @file DrumMachine.tsx
 * @description Componente de máquina de ritmos que permite reproducir sonidos 
 * al hacer clic en un botón. Este componente está diseñado utilizando TypeScript (TSX)
 * y Bootstrap para el estilo.
 * 
 * @import { Audio } from "./Types" - Importa la interfaz Audio definida en el archivo Types.
 * @import 'bootstrap/dist/css/bootstrap.min.css' - Importa el CSS de Bootstrap para aplicar estilos.
 */

import { Audio } from "./Types"
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * @interface DrumMachineProps
 * @description Define las propiedades que se pasan al componente DrumMachine.
 * 
 * @property {Audio} audio - Un objeto de tipo Audio que contiene información sobre el sonido a reproducir.
 * @property {number} volume - Un número que representa el volumen a establecer al reproducir el sonido.
 */
interface DrumMachineProps{
    audio: Audio; // Objeto de audio que incluye la información del sonido
    volume: number; // Nivel de volumen para la reproducción del sonido
}

/**
 * @function DrumMachine
 * @description Componente funcional que representa un botón de la máquina de ritmos. 
 * Al hacer clic en el botón, reproduce el sonido correspondiente.
 * 
 * @param {DrumMachineProps} props - Propiedades del componente que incluyen el objeto audio y el volumen.
 * 
 * @returns {JSX.Element} Un botón que, al hacer clic, reproduce un sonido asociado.
 */
const DrumMachine = ({audio, volume}: DrumMachineProps) => {
    /**
     * @function playSound
     * @description Reproduce el sonido asociado al clip y actualiza el elemento de visualización con 
     * la descripción del sonido.
     * 
     * @param {Audio} clip - El objeto Audio que contiene la información del sonido a reproducir.
     */
    const playSound = (clip: Audio) => {
        //(document.getElementById(clip.keyTrigger) as HTMLAudioElement).play().catch(console.error);
        const audioElement = document.getElementById(clip.keyTrigger) as HTMLAudioElement;

        if(audioElement){
            audioElement.volume = volume; // Establece el volumen del audio.
            audioElement.play().then(() => {
                console.log(`Reproduciendo: ${clip.description} con volumen ${volume}`);
            }).catch((error) => {
                console.log("Error al reproducir el sonido:", error);
            });
            document.getElementById("display")!.innerText = clip.description; // Actualiza el display con la descripción del sonido.
        } else {
            console.log("Elemento de audio no encontrado para:", clip.keyTrigger);
        }
      };
  return (
    <button className="drum-pad btn btn-primary btn-lg mb-3 w-100" id={`drum-${audio.keyTrigger}`} onClick={() => playSound(audio)}>
        <audio src={audio.url} id={audio.keyTrigger} className="clip" />
        {audio.keyTrigger}
    </button>
  )
}

export default DrumMachine