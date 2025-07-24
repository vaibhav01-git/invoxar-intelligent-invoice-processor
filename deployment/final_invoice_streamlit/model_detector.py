import os
import numpy as np
from PIL import Image
import cv2

def load_model():
    """Load the trained model - fallback implementation without TensorFlow"""
    try:
        # Try to load TensorFlow model if available
        import tensorflow as tf
        model_path = os.path.join(os.path.dirname(__file__), '..', '..', 'workspace', 'training_demo', 'exported-models', 'my_model', 'saved_model')
        if os.path.exists(model_path):
            return tf.saved_model.load(model_path)
    except ImportError:
        pass  # TensorFlow not available
    except Exception:
        pass  # Model loading failed
    
    return None

def detect_objects(image_path, model=None):
    """Detect objects in image - fallback implementation"""
    try:
        if model is None:
            return None
            
        # If we have a TensorFlow model, use it
        try:
            import tensorflow as tf
            image = Image.open(image_path).convert('RGB')
            img_array = np.array(image)
            input_tensor = tf.convert_to_tensor(img_array)
            input_tensor = input_tensor[tf.newaxis, ...]
            
            detections = model(input_tensor)
            
            # Process detections and return bounding boxes
            boxes = detections['detection_boxes'][0].numpy()
            classes = detections['detection_classes'][0].numpy().astype(int)
            scores = detections['detection_scores'][0].numpy()
            
            height, width = img_array.shape[:2]
            detected_boxes = []
            
            class_names = {
                1: 'CompanyName',
                2: 'CompanyAddress', 
                3: 'CustomerAddress',
                4: 'Total',
                5: 'InvoiceNumber',
                6: 'Date'
            }
            
            for i, (box, class_id, score) in enumerate(zip(boxes, classes, scores)):
                if score > 0.3 and class_id in class_names:
                    y1, x1, y2, x2 = box
                    detected_boxes.append({
                        'label': class_names[class_id],
                        'xmin': int(x1 * width),
                        'ymin': int(y1 * height),
                        'xmax': int(x2 * width),
                        'ymax': int(y2 * height)
                    })
            
            return detected_boxes
            
        except ImportError:
            pass  # TensorFlow not available
        except Exception:
            pass  # Detection failed
            
    except Exception:
        pass
    
    return None