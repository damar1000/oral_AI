// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
// import { nextFrame } from "@tensorflow/tfjs";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import { drawRect } from "../../utilities/aiUtilities";
import Navbar from "../../components/Navbar";
import { model } from "@tensorflow/tfjs";

function App() {
  const [imageTag, setImageTag] = useState([]);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isCameraClose, setIsCameraClose] = useState(true);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const navigate = useNavigate();

  // // Main function
  // const runCoco = async () => {
  //   // 3. TODO - Load network
  //   // e.g. const net = await cocossd.load();
  //   // https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json
  //   const net = await tf.loadGraphModel(
  //     // "https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json"
  //     "http://ai.suryaformosa.com/oralai/model.json"
  //   )

  //   //  Loop and detect hands
  //   setInterval(() => {
  //     detect(net);
  //   }, 16.7);
  // };

  const loadModel = async () => {
    let model = null
    // Load the model.
    tf.ready().then(() => {
      model = tf.loadLayersModel('http://ai.suryaformosa.com/oralai/model.json');
      return model
    });
    console.log("Model loaded");
    setIsModelReady(true);
  }

  const triggerCamera = () => {
    setIsCameraClose(!isCameraClose);
    setTimeout(() => {
      setIsModelReady(!isModelReady);
      runCoco();
    }, 1000);
  }

  const detect = async (screenshot) => {
    const model = await tf.loadLayersModel('http://ai.suryaformosa.com/oralai/model.json');

    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const img = tf.browser.fromPixels(screenshot);
      const resized = tf.image.resizeBilinear(img, [640, 480]);
      const casted = resized.cast("int32");
      const expanded = casted.expandDims(0);
      const obj = model.predict(expanded);
      // console.log(obj)
      alert(obj)

      const boxes = await obj[1].array();
      const classes = await obj[2].array();
      const scores = await obj[4].array();

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)
      requestAnimationFrame(() => {
        drawRect(
          boxes[0],
          classes[0],
          scores[0],
          0.8,
          videoWidth,
          videoHeight,
          ctx
        );
      });

      tf.dispose(img);
      tf.dispose(resized);
      tf.dispose(casted);
      tf.dispose(expanded);
      tf.dispose(obj);
    }
  };


  const saveImageClick = async () => {
    let imageSrc = webcamRef.current.getScreenshot();
    setImageTag([...imageTag, { dataUrl: imageSrc }]);
    console.log(imageTag);
  };

  const predictImage = async (imageData) => {
    let image = new Image();
    image.src = imageData;
    detect(image);
    console.log('Predicted');
  }

  useEffect(() => {
    // runCoco();
    // if(!localStorage.getItem('token')){
    //   navigate('/login')
    // }
    tf.ready()
  });

  return (
    <Navbar>
      <div className="min-h-screen p-4 px-6 scrollbar-thin scrollbar-thumb-base-200 scrollbar-track-zinc-400">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <section className="rounded">
            {
              isCameraClose ?

                <div className='flex lg:h-[480px] lg:w-[720px] justify-center items-center w-full'>
                  <button onClick={triggerCamera} className='btn btn-info btn-outline'>Open Camera</button>
                </div>
                :

                <>
                  <h1 className="ml-12 mb-10 text-xl font-bold">Camera</h1>
                  <div className="relative h-[270px] w-[480px] lg:w-[640px] lg:h-[480px] ml-12">
                    {
                      isModelReady ?
                        <>
                          <Webcam
                            ref={webcamRef}
                            muted={true}
                            screenshotQuality={0.8}
                            className="absolute h-[270px] w-[480px] lg:w-[640px] lg:h-[480px] z-10 rounded-lg"
                          />

                          <canvas
                            ref={canvasRef}
                            className='absolute h-[270px] w-[480px] lg:w-[640px] lg:h-[480px] z-20'
                          />
                        </>
                        :
                        <>
                          <div className='flex lg:h-[480px] lg:w-[720px] justify-center items-center w-full'>
                            <BeatLoader color='#00BFFF' />
                          </div>
                        </>
                    }
                  </div>
                </>
            }
          </section>
          <div className="flex flex-col pl-10 mt-4 gap-4">
            <div className="flex gap-3">
              <button onClick={saveImageClick} className='btn btn-primary btn-outline'>Capture</button>
              <button onClick={saveImageClick} className='btn btn-secondary btn-outline'>Upload</button>
            </div>
            <p className="text-lg font-semibold">Images History</p>
            <div className="card bg-base-200 h-[500px] w-[480px] mr-12 p-4 overflow-y-scroll scrollbar-none">
              {imageTag.length > 0 ? (
                imageTag.map((item, index) => (
                  <div className="flex">
                    <a key={index} href={item.dataUrl} download={`${new Date().getTime()}.jpg`}>
                    <img src={item.dataUrl} ref={imageRef} width={300} alt="images" className="rounded mt-4" />
                    </a>
                    <div className="flex flex-col items-center justify-center p-3 ml-1 gap-3 text-center">
                      <button className='btn btn-primary btn-outline' onClick={predictImage(item.dataUrl)}>Predict</button>
                      <h1>Predict will appear here!</h1>
                      <button className='btn btn-error btn-outline'>Delete</button>
                    </div>
                  </div>
                ))
              )
                :
                <div>
                  <p className="text-lg font-semibold">No Images</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div >
    </Navbar >
  );
}

export default App;
