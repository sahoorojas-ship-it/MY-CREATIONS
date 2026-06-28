"""
J.A.R.V.I.S — Just A Rather Very Intelligent System
Enhanced Cyberpunk HUD v3.2
Creator : Esan Sahoo
"""

import os, sys, subprocess, threading, webbrowser, datetime, re, math, random, json, hashlib, time
import tkinter as tk
from tkinter import scrolledtext
import tkinter.messagebox as msgbox

# AUTO-INSTALLER
_REQUIRED = {
    "speech_recognition": "SpeechRecognition",
    "pyttsx3": "pyttsx3",
    "google.generativeai": "google-generativeai",
}

def _auto_install():
    missing = []
    for module, pkg in _REQUIRED.items():
        try: __import__(module)
        except ImportError: missing.append(pkg)
    if not missing: return
    print(f"\n[J.A.R.V.I.S] Auto-installing {len(missing)} packages...")
    for pkg in missing:
        subprocess.run([sys.executable, "-m", "pip", "install", pkg, "--quiet"], timeout=120)
    print("[J.A.R.V.I.S] Done.\n")

_auto_install()

try: import speech_recognition as sr; SPEECH_AVAILABLE = True
except: SPEECH_AVAILABLE = False
try: import pyttsx3; TTS_AVAILABLE = True
except: TTS_AVAILABLE = False
try: import google.generativeai as genai; GEMINI_AVAILABLE = True
except: GEMINI_AVAILABLE = False

try:
    import cv2
    import numpy as np
    CV_AVAILABLE = True
except:
    CV_AVAILABLE = False

# FACE RECOGNITION PATH
FACE_MODEL_PATH = os.path.join(os.path.expanduser("~"), ".jarvis_face_model.yml")

JARVIS_INFO = {
    "name":"J.A.R.V.I.S","full":"Just A Rather Very Intelligent System",
    "tagline":"The brain behind the brilliance.",
    "version":"3.2.0","model":"Google Gemini 2.5 Pro",
    "creator":"Esan Sahoo","build":"2025",
}

CONFIG_FILE = os.path.join(os.path.expanduser("~"),".jarvis_config.json")

def load_config():
    try:
        with open(CONFIG_FILE) as f: return json.load(f)
    except: return {}

def save_config(cfg):
    with open(CONFIG_FILE,"w") as f: json.dump(cfg,f,indent=2)

SYSTEM_PROMPT = "You are J.A.R.V.I.S..."

# UPDATED CYBERPUNK COLOR PALETTE
C = {
    "bg0": "#00070F","bg1": "#001220","bg2": "#00213A",
    "bg3": "#003355","bg4": "#004466",
    "neon": "#00F0FF","neon2": "#00CCFF","neon3": "#0099CC",
    "arc": "#00FFFF","arc2": "#00B8FF","arc3": "#0088FF",
    "green": "#00FFAA","amber": "#FFCC00","red": "#FF3366",
    "txt": "#CCFFFF","txt2": "#88DDFF","txt3": "#447788",
    "grid": "#002244","scan": "#001122",
}

FF = "Helvetica"
MONO = "Courier New"

# DRAWING UTILITIES
def draw_grid(cv, w, h, step=35):
    for x in range(0, w, step):
        cv.create_line(x,0,x,h, fill=C["grid"], width=1)
    for y in range(0, h, step):
        cv.create_line(0,y,w,y, fill=C["grid"], width=1)

def draw_scanlines(cv, w, h):
    for y in range(0, h, 3):
        cv.create_line(0,y,w,y, fill=C["scan"], width=1)

def circle(cv, cx, cy, r, fill="", outline="", width=1, tags=""):
    cv.create_oval(cx-r,cy-r,cx+r,cy+r, fill=fill, outline=outline, width=width, tags=tags)

def ring_gauge(cv, cx, cy, r, value, col, bg_col, width=6):
    cv.create_arc(cx-r,cy-r,cx+r,cy+r, start=90, extent=-360, outline=bg_col, width=width, style="arc")
    if value > 0:
        cv.create_arc(cx-r,cy-r,cx+r,cy+r, start=90, extent=-int(360*value), outline=col, width=width, style="arc")

def hud_text(cv, x, y, text, size=8, col=None, anchor="nw", bold=False):
    font = (FF, size, "bold") if bold else (FF, size)
    cv.create_text(x, y, text=text, font=font, fill=col or C["txt2"], anchor=anchor)

# JARVIS ENGINE
class JarvisEngine:
    def __init__(self, api_key=""):
        self.status="STANDBY"; self.reminders=[]; self.history=[]
        self.voice_on=False; self.tts=None; self.recog=None; self.model=None
        self.api_key=api_key
        self._boot()

    def _boot(self):
        if TTS_AVAILABLE:
            self.tts = pyttsx3.init()
            self.tts.setProperty("rate", 175)
        if SPEECH_AVAILABLE:
            self.recog = sr.Recognizer()
        if GEMINI_AVAILABLE and self.api_key:
            try:
                genai.configure(api_key=self.api_key)
                self.model = genai.GenerativeModel("gemini-2.5-pro")
            except: pass

    def speak(self, text):
        if self.tts and self.voice_on:
            self.tts.say(text[:600])
            self.tts.runAndWait()

    def process(self, user_input):
        cmd = user_input.strip().lower()
        if "wake up" in cmd:
            return "Systems online. Awaiting orders, sir.", "status"
        if "shutdown" in cmd:
            return "Shutdown sequence initiated.", "shutdown"
        return "Command acknowledged.", "ai"

# LOCK SCREEN
class LockScreen(tk.Toplevel):
    def __init__(self, parent, cfg, on_unlock):
        super().__init__(parent)
        self.cfg = cfg
        self.on_unlock = on_unlock
        self._alive = True
        self.overrideredirect(True)
        self.configure(bg=C["bg0"])
        self.geometry("800x540")
        self._build()

    def _build(self):
        self.cv = tk.Canvas(self, width=800, height=540, bg=C["bg0"], highlightthickness=0)
        self.cv.pack(fill="both", expand=True)
        draw_grid(self.cv, 800, 540)
        draw_scanlines(self.cv, 800, 540)

        cx, cy = 400, 220
        for r in [130, 100, 70, 45]:
            circle(self.cv, cx, cy, r, outline=C["neon"], width=2)
        circle(self.cv, cx, cy, 38, fill=C["arc"], outline="#FFFFFF", width=4)

        hud_text(self.cv, 400, 70, "J.A.R.V.I.S", 32, C["neon"], anchor="center", bold=True)
        hud_text(self.cv, 400, 110, "IDENTITY VERIFICATION REQUIRED", 10, C["txt2"], anchor="center")

        # Face ID Button
        self.cv.create_rectangle(250, 380, 550, 440, outline=C["arc2"], width=3, tags="face")
        hud_text(self.cv, 400, 410, "📷  FACE RECOGNITION", 12, C["arc2"], anchor="center", bold=True)
        self.cv.tag_bind("face", "<Button-1>", lambda e: self._try_face())

        hud_text(self.cv, 400, 500, "or use PASSWORD / VOICE", 9, C["txt3"], anchor="center")

    def _try_face(self):
        if not CV_AVAILABLE or not os.path.exists(FACE_MODEL_PATH):
            msgbox.showwarning("Face ID", "Train your face in Settings first.")
            return
        recognizer = cv2.face.LBPHFaceRecognizer_create()
        recognizer.read(FACE_MODEL_PATH)
        cap = cv2.VideoCapture(0)
        fc = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
        for _ in range(45):
            ret, frame = cap.read()
            if not ret: continue
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = fc.detectMultiScale(gray, 1.1, 5)
            for (x,y,w,h) in faces:
                roi = cv2.resize(gray[y:y+h, x:x+w], (200,200))
                label, conf = recognizer.predict(roi)
                if label == 1 and conf < 85:
                    cap.release()
                    msgbox.showinfo("Success", "Face Verified ✓")
                    self._unlock()
                    return
        cap.release()
        msgbox.showerror("Denied", "Face not recognized")

    def _unlock(self):
        self._alive = False
        self.destroy()
        self.on_unlock()

# SETTINGS
class SettingsDialog(tk.Toplevel):
    def __init__(self, parent, cfg, engine):
        super().__init__(parent)
        self.cfg = cfg
        self.engine = engine
        self.title("J.A.R.V.I.S Settings")
        self.geometry("580x620")
        self.configure(bg=C["bg1"])
        self._build()

    def _build(self):
        tk.Button(self, text="TRAIN FACE ID", font=(FF,11,"bold"), bg=C["arc"], fg="black",
                  command=self._train_face).pack(pady=30, padx=50, fill="x")

    def _train_face(self):
        if not CV_AVAILABLE:
            msgbox.showerror("Error", "Install opencv-python")
            return
        if msgbox.askyesno("Train Face", "Capture 30 samples?"):
            cap = cv2.VideoCapture(0)
            cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
            samples = []
            count = 0
            while count < 30:
                ret, frame = cap.read()
                if ret:
                    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                    faces = cascade.detectMultiScale(gray, 1.1, 5)
                    for (x,y,w,h) in faces:
                        roi = cv2.resize(gray[y:y+h, x:x+w], (200,200))
                        samples.append(roi)
                        count += 1
            cap.release()
            if samples:
                recognizer = cv2.face.LBPHFaceRecognizer_create()
                recognizer.train(samples, np.array([1]*len(samples)))
                recognizer.save(FACE_MODEL_PATH)
                msgbox.showinfo("Success", "Face trained successfully!")

# MAIN
def main():
    root = tk.Tk()
    root.withdraw()
    cfg = load_config()
    LockScreen(root, cfg, lambda: JarvisGUI(root, cfg))
    root.mainloop()

class JarvisGUI:
    def __init__(self, root, cfg):
        self.root = root
        self.cfg = cfg
        self.root.title("J.A.R.V.I.S — Stark Industries")
        self.root.geometry("1400x860")
        self.root.configure(bg=C["bg0"])
        print("J.A.R.V.I.S Enhanced Interface Loaded")

if __name__ == "__main__":
    main()