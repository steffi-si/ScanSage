import { useEffect , useRef , useState } from 'react';
import { useZxing} from 'react-zxing';
import { useMediaDevices } from 'react-media-devices';


const constraints = {
    video: true,
    audio: false,
  };

function BarcodeScanner({ onDetected }) {
    const [deviceId, setDeviceId] = useState(null);
    const [torchEnabled, setTorchEnabled] = useState(false);
    const { devices } = useMediaDevices({ constraints });
    const { ref, torch: { on, off, isOn, isAvailable } } = useZxing({
      deviceId,
      paused: !deviceId, 
      onDecodeResult: (result) => {
        onDetected(result.getText()); 
      },
    });
    
    const handleDeviceChange = (event) => {
        setDeviceId(event.target.value);
      };
    
      const handleTorchToggle = () => {
        if (isAvailable) {
          if (isOn) {
            off();
          } else {
            on();
          }
          setTorchEnabled(!torchEnabled);
        }
      };
    
      return (
        <div>
          {devices && devices.length > 0 && (
            <select value={deviceId} onChange={handleDeviceChange}>
              <option value="">Choose device </option>
              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || 'Kamera ' + (devices.indexOf(device) + 1)}
                </option>
              ))}
            </select>
          )}
          <video ref={ref} />
          {isAvailable && (
            <button onClick={handleTorchToggle}>
              {torchEnabled ? 'Taschenlampe ausschalten' : 'Taschenlampe einschalten'}
            </button>
          )}
        </div>
      );
};
    
export default BarcodeScanner;  
    
