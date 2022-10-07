// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import { loadModel } from "./loadModel";

function App() {
  const [imageTag, setImageTag] = useState([]);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isCameraClose, setIsCameraClose] = useState(true);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const navigate = useNavigate();

  const triggerCamera = () => {
    setIsCameraClose(!isCameraClose);
    setIsModelReady(!isModelReady);
  };

  const detect = async (screenshot, index) => {
    const list = [...imageTag];
    setImageTag(list);
    
    const model = await loadModel();
    
    const img = tf.browser.fromPixels(screenshot);
    const resized = tf.image.resizeBilinear(img, [640, 480]);
    const casted = resized.cast("int32");
    const expanded = casted.expandDims(0);
    const obj = model.predict(expanded);
    let predicted = obj.argMax(1).dataSync()[0];
    
    if(predicted === 0){
      list[index]["prediction"] = "Aphtous Stomatitis";
      toast.success("Predicted : Aphtous Stomatitis");
    } 
    else if(predicted === 1){
      list[index]["prediction"] = "Gingivitis";
      toast.success("Predicted : Gingivitis");
    }
    else if(predicted === 2){
      list[index]["prediction"] = "Leukoplakia";
      toast.success("Predicted : Leukoplakia");
    }
    else if(predicted === 3){
      list[index]["prediction"] = "Healthy";
      toast.success("Predicted : Healthy");
    }
    else if(predicted === 4){
      list[index]["prediction"] = "Oral Cancer";
      toast.success("Predicted : Oral Cancer");
    }
    else if(predicted === 5){
      list[index]["prediction"] = "Periodontitis";
      toast.success("Predicted : Periodontitis");
    }
    else if(predicted === 6){
      list[index]["prediction"] = "Abrasion";
      toast.success("Predicted : Abrasion");
    }
  };

  const saveImageClick = async () => {
    let imageSrc = webcamRef.current.getScreenshot();
    setImageTag([...imageTag, { dataUrl: imageSrc }]);
    console.log(imageTag);
  };

  const handleServiceRemove = async (index) => {
    const list = [...imageTag];
    list.splice(index, 1);
    setImageTag(list);
  };

  const predictImage = (imageData, index) => {
    let image = new Image();
    image.src = imageData;
    detect(image, index);
  };

  useEffect(() => {
    // if(!localStorage.getItem('token')){
    //   navigate('/login')
    // }
  }, []);

  return (
    <Navbar>
      <div className="min-h-screen p-4 px-6 scrollbar-thin scrollbar-thumb-base-200 scrollbar-track-zinc-400">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <section className="rounded">
            {isCameraClose ? (
              <div className="flex lg:h-[480px] lg:w-[720px] justify-center items-center w-full">
                <button
                  onClick={triggerCamera}
                  className="btn btn-info btn-outline"
                >
                  Open Camera
                </button>
              </div>
            ) : (
              <>
                <h1 className="ml-12 mb-10 text-xl font-bold">Camera</h1>
                <div className="relative h-[270px] w-[480px] lg:w-[640px] lg:h-[480px] ml-12">
                  {isModelReady ? (
                    <>
                      <Webcam
                        ref={webcamRef}
                        muted={true}
                        screenshotQuality={0.8}
                        className="absolute h-[270px] w-[480px] lg:w-[640px] lg:h-[480px] z-10 rounded-lg"
                      />

                      <canvas
                        ref={canvasRef}
                        className="absolute h-[270px] w-[480px] lg:w-[640px] lg:h-[480px] z-20"
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex lg:h-[480px] lg:w-[720px] justify-center items-center w-full">
                        <BeatLoader color="#00BFFF" />
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </section>
          <div className="flex flex-col pl-10 mt-4 gap-4">
            <div className="flex gap-3">
              <button
                onClick={saveImageClick}
                className="btn btn-primary btn-outline"
              >
                Capture
              </button>
              <button
                onClick={saveImageClick}
                className="btn btn-secondary btn-outline"
              >
                Upload
              </button>
            </div>
            <p className="text-lg font-semibold">Images History</p>
            <div className="card bg-base-200 h-[500px] w-[480px] mr-12 p-4 overflow-y-scroll scrollbar-none">
              {imageTag.length > 0 ? (
                imageTag.map((item, index) => (
                  <div className="flex" key={index}>
                    <a
                      href={item.dataUrl}
                      download={`${new Date().getTime()}.jpg`}
                    >
                      <img
                        src={'data:image/jpeg;base64,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'}
                        ref={imageRef}
                        width={300}
                        alt="images"
                        className="rounded mt-4"
                      />
                    </a>
                    <div className="flex flex-col items-center justify-center p-3 ml-1 gap-3 text-center">
                      <button
                        className="btn btn-primary btn-outline"
                        onClick={() => predictImage(item.dataUrl, index)}
                      >
                        Predict
                      </button>
                      <h1>{item.prediction}</h1>
                      <button className="btn btn-error btn-outline" onClick={() => handleServiceRemove(index)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <p className="text-lg font-semibold">No Images</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default App;
