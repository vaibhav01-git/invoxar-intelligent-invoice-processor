import os
import cv2
import glob
import xml.etree.ElementTree as ET

# Paths
IMG_DIR = "workspace/training_demo/images/test_images/"
OUT_DIR = os.path.join(IMG_DIR, "visualized")
os.makedirs(OUT_DIR, exist_ok=True)

# Colors for each class (BGR)
COLORS = {
    "CompanyName": (255, 0, 0),
    "CompanyAddress": (0, 255, 0),
    "CustomerAddress": (0, 0, 255),
    "Total": (255, 255, 0),
    "InvoiceNumber": (255, 0, 255),
    "Date": (0, 255, 255),
}

def draw_boxes(image, xml_path):
    tree = ET.parse(xml_path)
    root = tree.getroot()
    for obj in root.findall("object"):
        name = obj.find("name").text
        bndbox = obj.find("bndbox")
        xmin = int(bndbox.find("xmin").text)
        ymin = int(bndbox.find("ymin").text)
        xmax = int(bndbox.find("xmax").text)
        ymax = int(bndbox.find("ymax").text)
        color = COLORS.get(name, (0, 0, 0))
        cv2.rectangle(image, (xmin, ymin), (xmax, ymax), color, 2)
        cv2.putText(image, name, (xmin, ymin - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
    return image

# Process all XML files in the directory
for xml_file in glob.glob(os.path.join(IMG_DIR, "*.xml")):
    tree = ET.parse(xml_file)
    root = tree.getroot()
    filename = root.find("filename").text
    img_path = os.path.join(IMG_DIR, filename)
    if not os.path.exists(img_path):
        print(f"Image not found: {img_path}")
        continue
    image = cv2.imread(img_path)
    image = draw_boxes(image, xml_file)
    out_path = os.path.join(OUT_DIR, filename)
    cv2.imwrite(out_path, image)
    print(f"Saved: {out_path}") 