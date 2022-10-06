import * as tf from "@tensorflow/tfjs";

export const loadModel = async () => {
  let model = await tf.loadLayersModel("http://ai.suryaformosa.com/oralai/model.json")
  return model;
};
