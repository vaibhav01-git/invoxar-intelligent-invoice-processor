import os
import numpy as np
import tensorflow as tf
from PIL import Image
import cv2

# Path to the saved model
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 
                         'training', 'exported-models', 'my_model', 'saved_model')

# Label map
LABEL_MAP = {
    1: "CompanyName",
    2: "CompanyAddress",
    3: "CustomerAddress",
    4: "Total",
    5: "InvoiceNumber",
    6: "Date"
}

# Load the model
def load_model():
    try:
        model = tf.saved_model.load(MODEL_PATH)
        return model
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        return None

# Detect objects in an image
def detect_objects(image_path, model, min_score_thresh=0.5):
    try:
        # Read image
        image = cv2.imread(image_path)
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        input_tensor = tf.convert_to_tensor(np.expand_dims(image_rgb, 0), dtype=tf.uint8)
        
        # Run inference
        detect_fn = model.signatures['serving_default']
        detections = detect_fn(input_tensor)
        
        # Process results
        boxes = detections['detection_boxes'][0].numpy()
        classes = detections['detection_classes'][0].numpy().astype(np.int32)
        scores = detections['detection_scores'][0].numpy()
        
        # Filter by threshold
        indices = np.where(scores >= min_score_thresh)[0]
        
        # Format results
        results = []
        height, width, _ = image.shape
        
        for i in indices:
            label = LABEL_MAP.get(classes[i], f"Unknown_{classes[i]}")
            ymin, xmin, ymax, xmax = boxes[i]
            
            # Convert normalized coordinates to pixel values
            xmin_px = int(xmin * width)
            xmax_px = int(xmax * width)
            ymin_px = int(ymin * height)
            ymax_px = int(ymax * height)
            
            results.append({
                'label': label,
                'xmin': xmin_px,
                'ymin': ymin_px,
                'xmax': xmax_px,
                'ymax': ymax_px,
                'score': float(scores[i])
            })
        
        return results
    except Exception as e:
        print(f"Error detecting objects: {str(e)}")
        return []

# Extract text from detected regions
def extract_text_from_regions(image_path, boxes):
    try:
        # This is a placeholder for OCR functionality
        # In a real implementation, you would use an OCR library like Tesseract
        # For now, we'll return placeholder values
        
        extracted_data = {}
        for box in boxes:
            label = box['label']
            if label == "CompanyName":
                extracted_data[label] = "Example Company Inc."
            elif label == "CompanyAddress":
                extracted_data[label] = "123 Business St, City, Country"
            elif label == "CustomerAddress":
                extracted_data[label] = "456 Customer Ave, Town, Country"
            elif label == "Total":
                extracted_data[label] = 1250.75
            elif label == "InvoiceNumber":
                extracted_data[label] = "INV-2023-00145"
            elif label == "Date":
                extracted_data[label] = "2023-07-15"
        
        return extracted_data
    except Exception as e:
        print(f"Error extracting text: {str(e)}")
        return {}