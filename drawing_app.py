# Install via: pip install Excalidraw-Interface
from Excalidraw_Interface import SketchBuilder

# Initialize the builder
sb = SketchBuilder()

# Create a hand-drawn style circle
circle = sb.Ellipse(200, 400, width=50, height=50, backgroundColor='red', roughness=1)

# Add a text box
text_box = sb.TextBox("Hello World", x=100, y=100)

# Export the structure to an .excalidraw file
sb.export_to_file('my_diagram.excalidraw')