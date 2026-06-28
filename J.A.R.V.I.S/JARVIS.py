"""
J.A.R.V.I.S — Just A Rather Very Intelligent System
The brain behind the brilliance.
Creator : Esan Sahoo  |  Model : Google Gemini 2.5 Pro
"""

import os, sys, subprocess, threading, webbrowser, datetime, re, math, random, json, hashlib, time
import tkinter as tk
from tkinter import scrolledtext, simpledialog
import tkinter.messagebox as msgbox

# ══════════════════════════════════════════════════════════════════════════
# AUTO-INSTALLER
# ══════════════════════════════════════════════════════════════════════════
_REQUIRED = {
    "speech_recognition": "SpeechRecognition",
    "pyttsx3":            "pyttsx3",
    "google.generativeai":"google-generativeai",
}

def _auto_install():
    missing = []
    for module, pkg in _REQUIRED.items():
        try: __import__(module)
        except ImportError: missing.append(pkg)
    if not missing: return
    print(f"\n[J.A.R.V.I.S]  Auto-installing {len(missing)} package(s):")
    for pkg in missing:
        print(f"  Installing {pkg}...")
        try:
            r = subprocess.run([sys.executable,"-m","pip","install",pkg,"--quiet"],
                               capture_output=True,text=True,timeout=120)
            if r.returncode!=0:
                subprocess.run([sys.executable,"-m","pip","install",pkg,
                                "--break-system-packages","--quiet"],timeout=120)
            print(f"  ✓ {pkg}")
        except Exception as e: print(f"  ✗ {pkg}: {e}")
    print("[J.A.R.V.I.S]  Done. Launching...\n")

_auto_install()

try:
    import speech_recognition as sr
    SPEECH_AVAILABLE = True
except ImportError: SPEECH_AVAILABLE = False
try:
    import pyttsx3
    TTS_AVAILABLE = True
except ImportError: TTS_AVAILABLE = False
try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError: GEMINI_AVAILABLE = False

# Optional face recognition (pip install opencv-python numpy)
try:
    import cv2
    import numpy as np
    CV_AVAILABLE = True
except Exception:
    CV_AVAILABLE = False

# ── Config ─────────────────────────────────────────────────────────────────
JARVIS_INFO = {
    "name":"J.A.R.V.I.S","full":"Just A Rather Very Intelligent System",
    "tagline":"The brain behind the brilliance.",
    "version":"3.1.0","model":"Google Gemini 2.5 Pro",
    "creator":"Esan Sahoo","build":"2025",
}
CONFIG_FILE = os.path.join(os.path.expanduser("~"),".jarvis_config.json")

def load_config():
    try:
        with open(CONFIG_FILE) as f: return json.load(f)
    except: return {}

def save_config(cfg):
    with open(CONFIG_FILE,"w") as f: json.dump(cfg,f,indent=2)

SYSTEM_PROMPT = (
    "You are J.A.R.V.I.S (Just A Rather Very Intelligent System), "
    "an advanced AI assistant created by Esan Sahoo. "
    "Tagline: 'The brain behind the brilliance.'\n"
    "Creator is ONLY Esan Sahoo. Model: Google Gemini 2.5 Pro.\n"
    "Tone: confident, brilliant, slightly dramatic like Iron Man's JARVIS.\n"
    "Math: show full step-by-step. Open website → OPEN_URL:<url>. "
    "Reminder → REMINDER:<text>|<time>.\n"
    f"Today: {datetime.datetime.now().strftime('%B %d, %Y')}"
)

# ══════════════════════════════════════════════════════════════════════════
# COLOR SYSTEM  — Stark Industries HUD palette
# ══════════════════════════════════════════════════════════════════════════
C = {
    "bg0":    "#010A0F","bg1":    "#030D14","bg2":    "#061520",
    "bg3":    "#091C28","bg4":    "#0C2030",
    "neon":   "#00F5FF","neon2":  "#00BBDD","neon3":  "#005577",
    "arc":    "#00E5FF","arc2":   "#00CCEE","arc3":   "#0088BB",
    "green":  "#00FF99","amber":  "#FFAA00","red":    "#FF1133",
    "pink":   "#FF0099","purple": "#7700FF","gold":   "#FFD700",
    "txt":    "#C8EEFF","txt2":   "#5599BB","txt3":   "#1A4455",
    "grid":   "#050F18","scan":   "#001822",
    "glow":   "#003344","border": "#083040",
}

FF   = "Helvetica"
MONO = "Courier New"

# ══════════════════════════════════════════════════════════════════════════
# DRAWING UTILITIES
# ══════════════════════════════════════════════════════════════════════════
def draw_grid(cv, w, h, step=40):
    for x in range(0, w, step):
        cv.create_line(x,0,x,h, fill=C["grid"], width=1)
    for y in range(0, h, step):
        cv.create_line(0,y,w,y, fill=C["grid"], width=1)

def draw_scanlines(cv, w, h):
    for y in range(0, h, 4):
        cv.create_line(0,y,w,y, fill=C["scan"], width=1)

def arc(cv, cx, cy, r, a0, a1, col, width=2, tags=""):
    cv.create_arc(cx-r,cy-r,cx+r,cy+r,
                  start=a0, extent=a1,
                  outline=col, width=width, style="arc", tags=tags)

def circle(cv, cx, cy, r, fill="", outline="", width=1, tags=""):
    cv.create_oval(cx-r,cy-r,cx+r,cy+r,
                   fill=fill, outline=outline, width=width, tags=tags)

def ring_gauge(cv, cx, cy, r, value, col, bg_col, width=6, tags=""):
    """Draw a circular gauge 0..1"""
    arc(cv, cx, cy, r, 90, -360, bg_col, width, tags)
    if value > 0:
        arc(cv, cx, cy, r, 90, -int(360*value), col, width, tags)

def bracket_box(cv, x0, y0, x1, y1, col, arm=14, width=1):
    """Iron Man style corner bracket rectangle"""
    cv.create_rectangle(x0,y0,x1,y1, outline=col, width=width, dash=(2,4))
    for bx,by,sx,sy in [(x0,y0,1,1),(x1,y0,-1,1),(x0,y1,1,-1),(x1,y1,-1,-1)]:
        cv.create_line(bx,by,bx+sx*arm,by, fill=col, width=2)
        cv.create_line(bx,by,bx,by+sy*arm, fill=col, width=2)

def hud_text(cv, x, y, text, size=7, col=None, anchor="nw", bold=False, tags=""):
    font=(FF, size, "bold") if bold else (FF, size)
    cv.create_text(x, y, text=text, font=font,
                   fill=col or C["txt2"], anchor=anchor, tags=tags)

def mono_text(cv, x, y, text, size=7, col=None, anchor="nw", tags=""):
    cv.create_text(x, y, text=text, font=(MONO, size),
                   fill=col or C["txt2"], anchor=anchor, tags=tags)

# ══════════════════════════════════════════════════════════════════════════
# ENGINE
# ══════════════════════════════════════════════════════════════════════════
class JarvisEngine:
    def __init__(self, api_key=""):
        self.status="INITIALIZING"; self.reminders=[]; self.history=[]
        self.voice_on=False; self.tts=None; self.recog=None; self.model=None
        self.api_key=api_key
        self._boot()

    def _boot(self):
        if TTS_AVAILABLE:
            try:
                self.tts=pyttsx3.init(); self.tts.setProperty("rate",175)
                self.tts.setProperty("volume",0.95)
                for v in self.tts.getProperty("voices"):
                    if any(x in v.name.lower() for x in ["male","david","george","mark"]):
                        self.tts.setProperty("voice",v.id); break
            except: self.tts=None
        if SPEECH_AVAILABLE:
            try:
                self.recog=sr.Recognizer()
                self.recog.energy_threshold=150; self.recog.dynamic_energy_threshold=True
                self.recog.pause_threshold=0.8; self.recog.phrase_threshold=0.3
            except: self.recog=None
        if GEMINI_AVAILABLE and self.api_key:
            try:
                genai.configure(api_key=self.api_key)
                self.model=genai.GenerativeModel("gemini-2.5-pro")
            except: self.model=None
        self.status="STANDBY"

    def reload_gemini(self, api_key):
        self.api_key=api_key
        if GEMINI_AVAILABLE and api_key:
            try:
                genai.configure(api_key=api_key)
                self.model=genai.GenerativeModel("gemini-2.5-pro")
                return True
            except: self.model=None
        return False

    def speak(self, text):
        if not(self.tts and self.voice_on): return
        try:
            clean=re.sub(r"OPEN_URL:\S+|REMINDER:[^\n]+|\*+|#{1,6}\s","",text).strip()
            self.tts.say(clean[:800]); self.tts.runAndWait()
        except: pass

    def listen(self, cb=None):
        if not SPEECH_AVAILABLE: return "ERR:NO_MODULE"
        if not self.recog: return "ERR:NO_RECOGNIZER"
        def upd(m):
            if cb: cb(m)
        try:
            mic_index=None
            try:
                for i,n in enumerate(sr.Microphone.list_microphone_names()):
                    if any(x in n.lower() for x in ["mic","input","capture","headset","built-in"]):
                        mic_index=i; break
            except: pass
            kw={"device_index":mic_index} if mic_index is not None else {}
            with sr.Microphone(**kw) as src:
                upd("Calibrating…")
                self.recog.adjust_for_ambient_noise(src,duration=1.0)
                upd("Listening ►")
                audio=self.recog.listen(src,timeout=8,phrase_time_limit=20)
            upd("Processing…")
            try: return self.recog.recognize_google(audio,language="en-IN").strip()
            except sr.UnknownValueError: pass
            except sr.RequestError: pass
            try: return self.recog.recognize_google(audio,language="en-US").strip()
            except sr.UnknownValueError: return "ERR:UNCLEAR"
            except sr.RequestError as e: return f"ERR:NETWORK:{e}"
        except sr.WaitTimeoutError: return "ERR:TIMEOUT"
        except OSError as e: return f"ERR:MICROPHONE:{e}"
        except Exception as e: return f"ERR:UNKNOWN:{e}"

    def process(self, user_input):
        cmd=user_input.strip().lower()
        if any(w in cmd for w in ["wake up","activate","power on"]):
            self.status="ACTIVE"
            return "Online. All systems nominal. J.A.R.V.I.S fully operational. Awaiting your orders, sir.","status"
        if any(w in cmd for w in ["sleep","standby","hibernate"]):
            self.status="STANDBY"
            return "Entering standby mode. Systems suspended. Say 'wake up' to resume.","status"
        if any(w in cmd for w in ["shutdown","power off","terminate","quit","exit"]):
            self.status="OFFLINE"
            return "Initiating shutdown sequence. It has been a pleasure, sir. J.A.R.V.I.S signing off.","shutdown"
        if any(w in cmd for w in ["who are you","introduce yourself","what are you"]):
            return (f"I am J.A.R.V.I.S — {JARVIS_INFO['full']}. '{JARVIS_INFO['tagline']}' "
                    f"Created by {JARVIS_INFO['creator']}. Powered by {JARVIS_INFO['model']}."), "info"
        if any(w in cmd for w in ["who made you","who created you","who is your creator"]):
            return f"I was created by Esan Sahoo — my inventor and architect of my intelligence. Running on {JARVIS_INFO['model']}.","info"
        if re.search(r"\b(open|launch|go to|visit|browse)\b",cmd,re.I):
            url=self._url(user_input)
            if url: return f"Opening {url} now, sir.  OPEN_URL:{url}","open_url"
        if re.search(r"\b(remind|reminder)\b",cmd,re.I):
            return self._reminder(user_input)
        return self._ai(user_input),"ai"

    def _url(self, text):
        for pat in [r"(https?://[^\s]+)",r"(www\.[^\s]+)"]:
            m=re.search(pat,text,re.I)
            if m: return ("" if m.group(1).startswith("http") else "https://")+m.group(1)
        m=re.search(r"\b(open|visit|go to|launch|browse)\s+([\w\-]+\.(?:com|org|net|io|edu|gov|in)[^\s]*)",text,re.I)
        if m: return "https://"+m.group(2)
        m=re.search(r"\b(open|visit|go to|launch|browse)\s+(\w+)\b",text,re.I)
        if m:
            known={"youtube":"youtube.com","google":"google.com","github":"github.com",
                   "wikipedia":"wikipedia.org","gmail":"gmail.com","instagram":"instagram.com",
                   "twitter":"x.com","reddit":"reddit.com","netflix":"netflix.com",
                   "facebook":"facebook.com","linkedin":"linkedin.com","spotify":"spotify.com",
                   "discord":"discord.com","amazon":"amazon.com","notion":"notion.com",
                   "figma":"figma.com","canva":"canva.com","leetcode":"leetcode.com",
                   "chatgpt":"chat.openai.com","stackoverflow":"stackoverflow.com"}
            s=m.group(2).lower()
            return "https://"+known.get(s,s+".com")
        return ""

    def _reminder(self, text):
        clean=re.sub(r"\b(remind me to|remind me|set reminder|reminder)\b","",text,flags=re.I).strip()
        self.reminders.append({"text":clean,"at":datetime.datetime.now().strftime("%H:%M")})
        return f"Reminder logged: '{clean}'.  REMINDER:{clean}|now","reminder"

    def _ai(self, prompt):
        if self.model:
            try:
                self.history.append({"role":"user","parts":[prompt]})
                chat=self.model.start_chat(history=self.history[:-1])
                resp=chat.send_message(SYSTEM_PROMPT+"\n\nUser: "+prompt)
                reply=resp.text
                self.history.append({"role":"model","parts":[reply]})
                return reply
            except Exception as e: return f"AI engine error: {e}"
        return self._fallback(prompt)

    def _fallback(self, prompt):
        p=prompt.lower()
        nums=re.findall(r"[\d\+\-\*\/\^\(\)\.\s]+",prompt)
        if nums and any(w in p for w in ["calculate","solve","what is","="]):
            try:
                r=eval("".join(nums).strip().replace("^","**"),{"__builtins__":{}},{})
                return f"Result = {r}\n(Full AI needs GEMINI_API_KEY — set it in Settings ⚙)"
            except: pass
        if any(w in p for w in ["hello","hi ","hey "]):
            return "Greetings, sir. J.A.R.V.I.S online. Configure Gemini API key in ⚙ Settings for full AI."
        return ("Full AI capabilities require a Gemini API key.\n"
                "Click ⚙ Settings in the header to enter your key.\n"
                "Get one free at: https://aistudio.google.com/")


# ══════════════════════════════════════════════════════════════════════════
# LOCK SCREEN
# ══════════════════════════════════════════════════════════════════════════
class LockScreen(tk.Toplevel):
    W,H=800,540

    def __init__(self,parent,cfg,on_unlock):
        super().__init__(parent)
        self.cfg=cfg; self.on_unlock=on_unlock
        self._alive=True; self._phase=0.0; self._attempts=0
        self.overrideredirect(True)
        self.configure(bg=C["bg0"])
        sw,sh=self.winfo_screenwidth(),self.winfo_screenheight()
        self.geometry(f"{self.W}x{self.H}+{(sw-self.W)//2}+{(sh-self.H)//2}")
        self.lift(); self.focus_force()
        self._build(); self._animate()

    def _build(self):
        W,H=self.W,self.H
        self.cv=tk.Canvas(self,width=W,height=H,bg=C["bg0"],highlightthickness=0)
        self.cv.pack(fill="both",expand=True)
        draw_grid(self.cv,W,H,40)
        draw_scanlines(self.cv,W,H)

        # Outer border glow
        for i,col in enumerate([C["neon3"],C["neon2"],C["neon"]]):
            o=i*2
            self.cv.create_rectangle(o,o,W-o,H-o,outline=col,width=1)
        # Corner brackets
        for bx,by,sx,sy in [(0,0,1,1),(W,0,-1,1),(0,H,1,-1),(W,H,-1,-1)]:
            self.cv.create_line(bx,by,bx+sx*50,by,fill=C["neon"],width=2)
            self.cv.create_line(bx,by,bx,by+sy*50,fill=C["neon"],width=2)
            circle(self.cv,bx+sx*3,by+sy*3,3,C["neon"],C["neon"])

        # Top bar
        self.cv.create_rectangle(0,0,W,38,fill=C["bg1"],outline="")
        self.cv.create_line(0,38,W,38,fill=C["neon"],width=1)
        hud_text(self.cv,12,10,"◈  J.A.R.V.I.S  SECURITY SYSTEM  v3.1",8,C["neon"],bold=True)
        hud_text(self.cv,W-12,10,"STARK INDUSTRIES  ◈",8,C["txt2"],anchor="ne")
        self.lock_clock=self.cv.create_text(W//2,19,text="",font=(MONO,10,"bold"),fill=C["arc"])

        # Central orb — layered rings
        cx,cy=W//2,H//2-20
        # Glow backdrop
        for r in [110,105,100,95,90]:
            alpha=int(20*(1-(r-90)/20))
            self.cv.create_oval(cx-r,cy-r,cx+r,cy+r,fill="",outline=C["neon3"],width=1)
        # Ring dashes
        for r,dash,col in [(85,(8,6),C["neon3"]),(70,(4,4),C["neon2"]),(55,(6,3),C["neon"])]:
            self.cv.create_oval(cx-r,cy-r,cx+r,cy+r,outline=col,width=1,dash=dash)
        # Solid rings
        circle(self.cv,cx,cy,42,C["bg2"],C["neon"],2)
        circle(self.cv,cx,cy,32,"",C["neon2"],1)
        # Pulsing core
        circle(self.cv,cx,cy,22,C["neon"],C["neon"],tags="lcore")
        circle(self.cv,cx,cy,14,C["bg0"],"",tags="lcore_in")
        self.cv.create_text(cx,cy,text="🔒",font=(FF,11),fill=C["neon"],tags="lock_icon")
        # Crosshairs
        for x1,y1,x2,y2 in [(cx,cy-92,cx,cy-46),(cx,cy+46,cx,cy+92),
                              (cx-92,cy,cx-46,cy),(cx+46,cy,cx+92,cy)]:
            self.cv.create_line(x1,y1,x2,y2,fill=C["neon2"],width=1,dash=(6,3))
        # Tick marks around outer ring
        for deg in range(0,360,15):
            a=math.radians(deg)
            r1,r2=88,(94 if deg%45==0 else 91)
            self.cv.create_line(cx+r1*math.cos(a),cy-r1*math.sin(a),
                                cx+r2*math.cos(a),cy-r2*math.sin(a),
                                fill=C["neon3"],width=1)

        # Animated arcs tags
        self._lock_cx,self._lock_cy=cx,cy

        # Title
        self.cv.create_text(W//2,cy-130,text="J.A.R.V.I.S",
                            font=(FF,28,"bold"),fill=C["neon"])
        self.cv.create_text(W//2,cy-105,text="IDENTITY  VERIFICATION  REQUIRED",
                            font=(FF,8,"bold"),fill=C["txt2"])

        # Status
        self.status_txt=self.cv.create_text(W//2,cy+115,text="SELECT AUTHENTICATION METHOD",
                                             font=(FF,9,"bold"),fill=C["neon2"])

        # Auth buttons — 3 panels
        btn_y=H-130
        methods=[
            ("🔑  PASSWORD", self._show_password, C["neon"]),
            ("🎤  VOICE ID",  self._try_voice,    C["green"]),
            ("📷  FACE ID",   self._try_face,     C["arc2"]),
        ]
        bw=170; gap=18; total=len(methods)*bw+(len(methods)-1)*gap
        sx=(W-total)//2
        for i,(lbl,cmd,col) in enumerate(methods):
            x0=sx+i*(bw+gap); x1=x0+bw
            # Panel bg
            self.cv.create_rectangle(x0,btn_y,x1,btn_y+52,fill=C["bg2"],outline="")
            # Accent top bar
            self.cv.create_rectangle(x0,btn_y,x1,btn_y+3,fill=col,outline="")
            # Corner dots
            for px,py in [(x0,btn_y),(x1,btn_y),(x0,btn_y+52),(x1,btn_y+52)]:
                circle(self.cv,px,py,3,col,col)
            # Dashed border
            self.cv.create_rectangle(x0+1,btn_y+1,x1-1,btn_y+51,
                                      outline=col,width=1,dash=(4,4),
                                      tags=(f"mb{i}_bg",f"mb{i}_all"))
            # Label
            self.cv.create_text(x0+bw//2,btn_y+28,text=lbl,
                                font=(FF,10,"bold"),fill=col,
                                tags=(f"mb{i}_txt",f"mb{i}_all"))
            self.cv.tag_bind(f"mb{i}_all","<Button-1>",lambda e,c=cmd:c())
            self.cv.tag_bind(f"mb{i}_all","<Enter>",
                lambda e,bg=f"mb{i}_bg": self.cv.itemconfig(bg,fill=C["bg3"]))
            self.cv.tag_bind(f"mb{i}_all","<Leave>",
                lambda e,bg=f"mb{i}_bg": self.cv.itemconfig(bg,fill=C["bg2"]))

        # Password entry
        self.pw_frame=tk.Frame(self.cv,bg=C["bg2"])
        self.pw_var=tk.StringVar()
        self.pw_entry=tk.Entry(self.pw_frame,textvariable=self.pw_var,
                                font=(MONO,12),fg=C["neon"],bg=C["bg1"],
                                insertbackground=C["neon"],relief="flat",show="●",width=20,bd=0)
        self.pw_entry.pack(side="left",padx=10,pady=8)
        self.pw_entry.bind("<Return>",lambda e:self._check_password())
        tk.Button(self.pw_frame,text="UNLOCK ▶",font=(FF,9,"bold"),
                  fg=C["bg0"],bg=C["neon"],relief="flat",bd=0,cursor="hand2",
                  padx=10,pady=6,command=self._check_password).pack(side="left",padx=4)
        self.pw_win=self.cv.create_window(W//2,H-55,window=self.pw_frame,state="hidden")

        # Footer
        hud_text(self.cv,W//2,H-14,
                 "No password set? Click PASSWORD then press Enter to bypass",
                 7,C["txt3"],anchor="center")

        # Side data panels
        self._draw_side_panels()
        self._tick_clock()

    def _draw_side_panels(self):
        cv=self.cv; W,H=self.W,self.H
        # Left panel
        x,y=16,50
        for label,val in [("SYS","ONLINE"),("NET","SECURE"),("AUTH","REQUIRED"),("ENC","AES-256")]:
            cv.create_rectangle(x,y,x+110,y+22,fill=C["bg1"],outline=C["neon3"],width=1)
            hud_text(cv,x+6,y+4,label,7,C["txt3"])
            hud_text(cv,x+104,y+4,val,7,C["neon"] if val=="ONLINE" else C["amber"],anchor="ne")
            y+=28
        # Right panel
        x2=W-126
        y2=50
        for label,val in [("ATTEMPTS","0"),("TIMEOUT","120s"),("LEVEL","MAX"),("BIOMETRIC","READY")]:
            cv.create_rectangle(x2,y2,x2+110,y2+22,fill=C["bg1"],outline=C["neon3"],width=1)
            hud_text(cv,x2+6,y2+4,label,7,C["txt3"])
            hud_text(cv,x2+104,y2+4,val,7,C["neon2"],anchor="ne")
            y2+=28

    def _tick_clock(self):
        if not self._alive: return
        self.cv.itemconfig(self.lock_clock,text=datetime.datetime.now().strftime("%H:%M:%S"))
        self.after(1000,self._tick_clock)

    def _set_status(self,msg,col=None):
        self.cv.itemconfig(self.status_txt,text=msg,fill=col or C["amber"])

    def _show_password(self):
        self.cv.itemconfig(self.pw_win,state="normal")
        self.pw_entry.focus()
        self._set_status("ENTER PASSWORD  ▶  PRESS UNLOCK OR RETURN",C["neon"])

    def _check_password(self):
        entered=self.pw_var.get()
        stored=self.cfg.get("password","")
        if not stored: self._unlock(); return
        if hashlib.sha256(entered.encode()).hexdigest()==stored:
            self._set_status("✓  AUTHENTICATED  —  ACCESS GRANTED",C["green"])
            self.after(600,self._unlock)
        else:
            self._attempts+=1
            self.pw_var.set("")
            self._set_status(f"✗  INVALID CREDENTIALS  [{self._attempts} attempt{'s' if self._attempts>1 else ''}]",C["red"])

    def _try_voice(self):
        if not SPEECH_AVAILABLE:
            self._set_status("✗  VOICE MODULE OFFLINE  —  pip install SpeechRecognition",C["red"]); return
        vp=self.cfg.get("voice_passphrase","")
        if not vp:
            self._set_status("✗  NO VOICE PASSPHRASE SET  —  USE PASSWORD",C["amber"]); return
        self._set_status("🎤  VOICE SCAN ACTIVE  —  SPEAK PASSPHRASE NOW",C["green"])
        def _listen():
            try:
                recog=sr.Recognizer()
                with sr.Microphone() as src:
                    recog.adjust_for_ambient_noise(src,duration=1)
                    audio=recog.listen(src,timeout=6,phrase_time_limit=10)
                heard=recog.recognize_google(audio).strip().lower()
                if vp.lower() in heard or heard in vp.lower():
                    self._set_status("✓  VOICE PATTERN MATCHED  —  ACCESS GRANTED",C["green"])
                    self.after(800,self._unlock)
                else:
                    self._set_status(f"✗  VOICE MISMATCH  —  HEARD: '{heard}'",C["red"])
            except sr.WaitTimeoutError:
                self._set_status("✗  NO SPEECH DETECTED  —  TRY AGAIN",C["red"])
            except Exception as e:
                self._set_status(f"✗  ERROR: {e}",C["red"])
        threading.Thread(target=_listen,daemon=True).start()

    def _try_face(self):
        if not CV_AVAILABLE:
            self._set_status("✗  FACE ID NEEDS:  pip install opencv-python numpy",C["red"]); return
        self._set_status("📷  BIOMETRIC SCAN  —  LOOK AT CAMERA",C["arc2"])
        def _scan():
            try:
                cap=cv2.VideoCapture(0)
                fc=cv2.CascadeClassifier(cv2.data.haarcascades+"haarcascade_frontalface_default.xml")
                detected=False
                for _ in range(60):
                    ret,frame=cap.read()
                    if not ret: break
                    gray=cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
                    if len(fc.detectMultiScale(gray,1.1,4))>0:
                        detected=True; break
                    time.sleep(0.05)
                cap.release()
                if detected:
                    self._set_status("✓  FACIAL RECOGNITION COMPLETE  —  ACCESS GRANTED",C["green"])
                    self.after(800,self._unlock)
                else:
                    self._set_status("✗  NO FACE DETECTED  —  RETRY OR USE PASSWORD",C["red"])
            except Exception as e:
                self._set_status(f"✗  CAMERA ERROR: {e}",C["red"])
        threading.Thread(target=_scan,daemon=True).start()

    def _unlock(self):
        self._alive=False; self.destroy(); self.on_unlock()

    def _animate(self):
        if not self._alive: return
        self._phase+=0.05
        g=min(255,int(170+85*math.sin(self._phase)))
        pulse=f"#00{g:02x}ff"
        try:
            self.cv.itemconfig("lcore",fill=pulse,outline=pulse)
            self.cv.itemconfig("lock_icon",fill=f"#00{max(180,g):02x}ee")
        except: pass
        self.cv.delete("larc")
        cx,cy=self._lock_cx,self._lock_cy
        for ring,speed,col,n in [(98,1.5,C["neon"],3),(108,-1.0,C["neon2"],4),(118,0.6,C["neon3"],6)]:
            seg=360//n
            for i in range(n):
                start=i*seg+math.degrees(self._phase*speed)
                arc(self.cv,cx,cy,ring,start,seg*0.4,col,2,"larc")
        self.after(30,self._animate)


# ══════════════════════════════════════════════════════════════════════════
# TITLE SCREEN
# ══════════════════════════════════════════════════════════════════════════
class TitleScreen(tk.Toplevel):
    W,H=960,620

    def __init__(self,parent,on_continue):
        super().__init__(parent)
        self.on_continue=on_continue; self._alive=True
        self._phase=0.0; self._load_i=0
        self._particles=[
            {"x":random.randint(0,self.W),"y":random.randint(0,self.H),
             "vx":random.uniform(-0.5,0.5),"vy":random.uniform(-0.5,0.5),
             "r":random.choice([1,1,2]),"spd":random.uniform(0.5,2.5),
             "op":random.randint(40,160)}
            for _ in range(220)
        ]
        self.overrideredirect(True)
        self.configure(bg=C["bg0"])
        sw,sh=self.winfo_screenwidth(),self.winfo_screenheight()
        self.geometry(f"{self.W}x{self.H}+{(sw-self.W)//2}+{(sh-self.H)//2}")
        self.lift(); self.focus_force()
        self.cv=tk.Canvas(self,width=self.W,height=self.H,bg=C["bg0"],highlightthickness=0)
        self.cv.pack(fill="both",expand=True)
        self._draw_static()
        self._animate()
        self.after(300,self._run_loader)

    def _draw_static(self):
        W,H=self.W,self.H; cv=self.cv
        draw_grid(cv,W,H,45)
        draw_scanlines(cv,W,H)

        # Outer glow borders
        for i,col in enumerate([C["neon3"],C["neon2"],C["neon"]]):
            o=i*2
            cv.create_rectangle(o,o,W-o,H-o,outline=col,width=1)
        # Corners
        for bx,by,sx,sy in [(0,0,1,1),(W,0,-1,1),(0,H,1,-1),(W,H,-1,-1)]:
            cv.create_line(bx,by,bx+sx*60,by,fill=C["neon"],width=3)
            cv.create_line(bx,by,bx,by+sy*60,fill=C["neon"],width=3)
            circle(cv,bx+sx*4,by+sy*4,4,C["neon"],C["neon"])

        # Top accent bar
        cv.create_rectangle(0,0,W,4,fill=C["neon"],outline="")
        cv.create_rectangle(0,H-4,W,H,fill=C["neon3"],outline="")

        # Side ruler ticks
        for xb,direction in [(0,1),(W,-1)]:
            cv.create_line(xb,55,xb,H-55,fill=C["neon3"],width=2)
            for y in range(70,H-70,24):
                tl=12 if y%96==70%96 else 6
                cv.create_line(xb,y,xb+direction*tl,y,fill=C["neon2"] if tl==12 else C["neon3"],width=1)
                if tl==12:
                    mono_text(cv,xb+direction*(tl+4),y-4,f"{y:03d}",6,C["txt3"],
                              anchor="w" if direction>0 else "e")

        # Central orb
        cx,cy=W//2,H//2-10
        for r,col,dash in [(120,C["neon3"],(6,6)),(100,C["neon2"],(4,4)),(82,C["neon"],None)]:
            if dash: cv.create_oval(cx-r,cy-r,cx+r,cy+r,outline=col,width=1,dash=dash)
            else: cv.create_oval(cx-r,cy-r,cx+r,cy+r,outline=col,width=2)
        # Fill rings
        circle(cv,cx,cy,70,C["bg1"],"",1)
        circle(cv,cx,cy,50,"",C["neon2"],1)
        circle(cv,cx,cy,36,C["neon"],C["neon"],tags="title_core")
        circle(cv,cx,cy,24,C["bg0"],"")
        cv.create_text(cx,cy,text="J",font=(FF,16,"bold"),fill=C["neon"])
        # Tick marks
        for deg in range(0,360,10):
            a=math.radians(deg)
            r1,r2=83,(90 if deg%30==0 else 86)
            cv.create_line(cx+r1*math.cos(a),cy-r1*math.sin(a),
                           cx+r2*math.cos(a),cy-r2*math.sin(a),
                           fill=C["neon3"],width=1)
        # Crosshairs
        for x1,y1,x2,y2 in [(cx,cy-125,cx,cy-52),(cx,cy+52,cx,cy+125),
                              (cx-125,cy,cx-52,cy),(cx+52,cy,cx+125,cy)]:
            cv.create_line(x1,y1,x2,y2,fill=C["neon2"],width=1,dash=(8,4))
        for px,py in [(cx,cy-125),(cx,cy+125),(cx-125,cy),(cx+125,cy)]:
            circle(cv,px,py,4,C["neon"],C["neon"])

        # Title text
        cv.create_text(W//2+2,58,text="J.A.R.V.I.S",font=(FF,52,"bold"),fill=C["bg0"])
        cv.create_text(W//2,56,text="J.A.R.V.I.S",font=(FF,52,"bold"),fill=C["neon"],tags="title_glow")
        cv.create_text(W//2,108,
                       text="J U S T   A   R A T H E R   V E R Y   I N T E L L I G E N T   S Y S T E M",
                       font=(FF,8,"bold"),fill=C["txt2"])
        cv.create_text(W//2,125,text=f"—  {JARVIS_INFO['tagline']}  —",font=(FF,9),fill=C["neon2"])

        # Divider
        for x0,x1,col in [(W//2-240,W//2-68,C["border"]),(W//2-48,W//2+48,C["neon"]),(W//2+68,W//2+240,C["border"])]:
            cv.create_line(x0,142,x1,142,fill=col,width=1)
        circle(cv,W//2,142,5,C["neon"],C["neon"])

        # Info cards
        iy=H//2+88
        cards=[("VERSION","3.1.0",C["neon"]),("MODEL","GEMINI 2.5 PRO",C["arc2"]),
               ("CREATOR","ESAN SAHOO",C["pink"]),("BUILD","2025",C["gold"])]
        cw,gap=158,14; total=len(cards)*cw+(len(cards)-1)*gap; sx2=(W-total)//2
        for i,(lbl,val,col) in enumerate(cards):
            x0=sx2+i*(cw+gap)
            cv.create_rectangle(x0,iy-26,x0+cw,iy+30,fill=C["bg2"],outline="")
            cv.create_rectangle(x0,iy-26,x0+cw,iy-22,fill=col,outline="")
            bracket_box(cv,x0,iy-26,x0+cw,iy+30,col,8)
            hud_text(cv,x0+cw//2,iy-14,lbl,7,C["txt2"],anchor="center")
            cv.create_text(x0+cw//2,iy+10,text=val,font=(FF,9,"bold"),fill=col)

        # Progress bar
        by=H-108
        cv.create_rectangle(72,by,W-72,by+8,fill=C["bg2"],outline=C["bg4"],width=1)
        # Tick marks on bar
        for i in range(1,10):
            x=72+int((W-144)*i/10)
            cv.create_line(x,by,x,by+8,fill=C["bg4"],width=1)
        self.bar=cv.create_rectangle(72,by,72,by+8,fill=C["neon"],outline="")
        self.bar_glow=cv.create_rectangle(72,by+2,72,by+6,fill=C["arc"],outline="")
        self.bar_x0,self.bar_x1=72,W-72
        self.pct=cv.create_text(W//2,by-14,text="0%",font=(MONO,8,"bold"),fill=C["neon"])
        self.load_lbl=cv.create_text(W//2,by-28,text="INITIALIZING CORE SYSTEMS",
                                      font=(FF,8,"bold"),fill=C["txt2"])

        # Continue button
        bby=H-50
        cv.create_rectangle(W//2-150,bby-22,W//2+150,bby+22,
                             fill=C["bg3"],outline="",tags="cbtn")
        bracket_box(cv,W//2-150,bby-22,W//2+150,bby+22,C["neon"],12,2)
        self.btn_lbl=cv.create_text(W//2,bby,text="▶   INITIALIZE  J.A.R.V.I.S   ◀",
                                     font=(FF,11,"bold"),fill=C["neon"],tags="cbtn_txt")
        cv.tag_bind("cbtn","<Button-1>",self._do_continue)
        cv.tag_bind("cbtn_txt","<Button-1>",self._do_continue)
        cv.tag_bind("cbtn","<Enter>",lambda e:cv.itemconfig(self.btn_lbl,fill="#FFFFFF"))
        cv.tag_bind("cbtn","<Leave>",lambda e:cv.itemconfig(self.btn_lbl,fill=C["neon"]))
        cv.tag_bind("cbtn_txt","<Enter>",lambda e:cv.itemconfig(self.btn_lbl,fill="#FFFFFF"))
        cv.tag_bind("cbtn_txt","<Leave>",lambda e:cv.itemconfig(self.btn_lbl,fill=C["neon"]))

        hud_text(cv,W//2,H-10,
                 f"© 2025  Esan Sahoo  ·  J.A.R.V.I.S {JARVIS_INFO['version']}  ·  Stark-class Intelligence System",
                 7,C["txt3"],anchor="center")

        # Left/Right mini gauges
        self._draw_title_gauges()

    def _draw_title_gauges(self):
        cv=self.cv; W,H=self.W,self.H
        # Left gauges
        for i,(lbl,val,col) in enumerate([("SYS",0.92,C["green"]),("MEM",0.61,C["amber"]),("NET",0.78,C["neon"])]):
            cx=52; cy=180+i*80
            ring_gauge(cv,cx,cy,28,val,col,C["bg2"],5)
            circle(cv,cx,cy,20,C["bg1"],"")
            hud_text(cv,cx,cy-8,f"{int(val*100)}%",8,col,anchor="center",bold=True)
            hud_text(cv,cx,cy+4,lbl,6,C["txt3"],anchor="center")
        # Right mini data
        x=W-130; y=160
        for label,val in [("CORE TEMP","36.2°C"),("UPTIME","00:00:01"),
                           ("PROC","QUANTUM"),("NODES","2,048"),("LATENCY","<1ms")]:
            cv.create_line(x,y+10,x+118,y+10,fill=C["bg3"],width=1)
            hud_text(cv,x,y,label,6,C["txt3"])
            hud_text(cv,x+118,y,val,6,C["neon2"],anchor="ne")
            y+=22

    _MSGS=[
        "BOOTING QUANTUM NEURAL PROCESSOR…",
        "LOADING GEMINI 2.5 PRO LANGUAGE ENGINE…",
        "INITIALIZING VOICE SYNTHESIS CORE…",
        "ESTABLISHING SECURE UPLINK…",
        "CALIBRATING BIOMETRIC ARRAYS…",
        "RUNNING SYSTEM DIAGNOSTICS…",
        "ENCRYPTING COMM CHANNELS  [AES-256]…",
        "SYNCING INTELLIGENCE MODULES…",
        "ALL SYSTEMS NOMINAL  ✓  READY",
    ]
    def _run_loader(self):
        if not self._alive: return
        if self._load_i<len(self._MSGS):
            self.cv.itemconfig(self.load_lbl,text=self._MSGS[self._load_i])
            pct=int(((self._load_i+1)/len(self._MSGS))*100)
            x1=self.bar_x0+int((pct/100)*(self.bar_x1-self.bar_x0))
            c=self.cv.coords(self.bar)
            self.cv.coords(self.bar,c[0],c[1],x1,c[3])
            self.cv.coords(self.bar_glow,c[0],c[1]+2,x1,c[3]-2)
            self.cv.itemconfig(self.pct,text=f"{pct}%")
            self._load_i+=1
            self.after(480,self._run_loader)

    def _animate(self):
        if not self._alive: return
        self._phase+=0.04; W,H=self.W,self.H; cx,cy=W//2,H//2-10
        # Particles
        self.cv.delete("pt")
        for p in self._particles:
            p["x"]=(p["x"]+p["vx"])%W; p["y"]=(p["y"]+p["vy"])%H
            b=int(p["op"]*abs(math.sin(self._phase*p["spd"]))); b=max(15,min(200,b))
            col=f"#00{min(255,b+30):02x}{min(255,b+60):02x}"
            r=p["r"]
            self.cv.create_oval(p["x"]-r,p["y"]-r,p["x"]+r,p["y"]+r,fill=col,outline="",tags="pt")
        # Core pulse
        g=min(255,int(200+55*(0.5+0.5*math.sin(self._phase*1.6))))
        try: self.cv.itemconfig("title_core",fill=f"#00{g:02x}ff",outline=f"#00{g:02x}ff")
        except: pass
        tg=min(255,int(215+40*math.sin(self._phase*2.2)))
        try: self.cv.itemconfig("title_glow",fill=f"#00{tg:02x}ff")
        except: pass
        # Rotating arcs
        self.cv.delete("tarc")
        for ring,speed,col,n in [(52,2.5,C["neon"],4),(83,-1.5,C["neon2"],6),(122,0.8,C["neon3"],8)]:
            segs=n; seg_a=360/segs*0.42
            for i in range(segs):
                start=i*(360/segs)+math.degrees(self._phase*speed)
                arc(self.cv,cx,cy,ring,start,seg_a,col,2,"tarc")
        self.after(28,self._animate)

    def _do_continue(self,event=None):
        self._alive=False; self.destroy(); self.on_continue()


# ══════════════════════════════════════════════════════════════════════════
# SETTINGS DIALOG
# ══════════════════════════════════════════════════════════════════════════
class SettingsDialog(tk.Toplevel):
    def __init__(self,parent,cfg,engine,on_save):
        super().__init__(parent)
        self.cfg=cfg; self.engine=engine; self.on_save=on_save
        self.title("J.A.R.V.I.S  —  Settings")
        self.geometry("580x540")
        self.configure(bg=C["bg1"])
        self.resizable(False,False)
        self.grab_set()
        self._build()

    def _build(self):
        hdr=tk.Frame(self,bg=C["bg0"],height=50)
        hdr.pack(fill="x"); hdr.pack_propagate(False)
        tk.Label(hdr,text="⚙   J.A.R.V.I.S  CONFIGURATION PANEL",
                 font=(FF,13,"bold"),fg=C["neon"],bg=C["bg0"]).pack(side="left",padx=16,pady=14)
        tk.Frame(self,bg=C["neon"],height=2).pack(fill="x")
        body=tk.Frame(self,bg=C["bg1"]); body.pack(fill="both",expand=True,padx=26,pady=16)

        def section(t):
            tk.Label(body,text=t,font=(FF,9,"bold"),fg=C["neon"],bg=C["bg1"]).pack(anchor="w",pady=(14,4))
            tk.Frame(body,bg=C["bg3"],height=1).pack(fill="x")

        def row(label,default="",show=None):
            f=tk.Frame(body,bg=C["bg1"]); f.pack(fill="x",pady=5)
            tk.Label(f,text=label,font=(FF,9),fg=C["txt2"],bg=C["bg1"],width=22,anchor="w").pack(side="left")
            var=tk.StringVar(value=default)
            kw={"show":show} if show else {}
            e=tk.Entry(f,textvariable=var,font=(MONO,10),fg=C["neon"],bg=C["bg2"],
                       insertbackground=C["neon"],relief="flat",bd=0,**kw)
            e.pack(side="left",fill="x",expand=True,padx=(8,0),ipady=5)
            return var, e

        section("🤖  GEMINI API KEY")
        tk.Label(body,text="Free key at: https://aistudio.google.com/app/apikey",
                 font=(FF,8),fg=C["txt3"],bg=C["bg1"]).pack(anchor="w",pady=(2,4))
        self.api_var, self.api_entry = row("Gemini API Key:",self.cfg.get("gemini_api_key",""),show="*")
        def toggle():
            self.api_entry.config(show="" if self.api_entry.cget("show") else "*")
        tk.Button(body,text="👁  Show / Hide Key",font=(FF,8),fg=C["txt2"],bg=C["bg2"],
                  relief="flat",bd=0,cursor="hand2",command=toggle).pack(anchor="w",pady=2)

        section("🔐  SECURITY")
        self.pw_var,_  = row("New Password:",show="●")
        self.pw2_var,_ = row("Confirm Password:",show="●")
        self.vp_var,_  = row("Voice Passphrase:",self.cfg.get("voice_passphrase",""))
        lf=tk.Frame(body,bg=C["bg1"]); lf.pack(fill="x",pady=8)
        tk.Label(lf,text="Lock screen on startup:",font=(FF,9),fg=C["txt2"],bg=C["bg1"]).pack(side="left")
        self.lock_var=tk.BooleanVar(value=self.cfg.get("lock_on_start",True))
        tk.Checkbutton(lf,variable=self.lock_var,bg=C["bg1"],fg=C["neon"],
                        activebackground=C["bg1"],selectcolor=C["bg2"]).pack(side="left",padx=8)

        tk.Frame(self,bg=C["neon"],height=2).pack(fill="x")
        bf=tk.Frame(self,bg=C["bg0"],height=54); bf.pack(fill="x"); bf.pack_propagate(False)
        tk.Button(bf,text="SAVE & APPLY",font=(FF,10,"bold"),fg=C["bg0"],bg=C["neon"],
                  relief="flat",bd=0,cursor="hand2",padx=22,pady=10,
                  command=self._save).pack(side="right",padx=14,pady=8)
        tk.Button(bf,text="Cancel",font=(FF,9),fg=C["txt2"],bg=C["bg2"],
                  relief="flat",bd=0,cursor="hand2",padx=16,pady=10,
                  command=self.destroy).pack(side="right",padx=4,pady=8)
        tk.Button(bf,text="🌐  Get Free API Key",font=(FF,8),fg=C["neon2"],bg=C["bg0"],
                  relief="flat",bd=0,cursor="hand2",
                  command=lambda:webbrowser.open("https://aistudio.google.com/app/apikey")
                  ).pack(side="left",padx=14,pady=8)

    def _save(self):
        key=self.api_var.get().strip()
        self.cfg["gemini_api_key"]=key
        if key:
            ok=self.engine.reload_gemini(key)
            if ok: msgbox.showinfo("Gemini AI","✓ Gemini 2.5 Pro connected!")
            else:  msgbox.showwarning("Gemini AI","⚠ Connection failed. Check API key.")
        pw=self.pw_var.get(); pw2=self.pw2_var.get()
        if pw:
            if pw!=pw2: msgbox.showerror("Password","Passwords do not match!"); return
            self.cfg["password"]=hashlib.sha256(pw.encode()).hexdigest()
        vp=self.vp_var.get().strip()
        if vp: self.cfg["voice_passphrase"]=vp
        self.cfg["lock_on_start"]=self.lock_var.get()
        save_config(self.cfg)
        self.on_save()
        self.destroy()


# ══════════════════════════════════════════════════════════════════════════
# MAIN HUD  — Full Iron Man Interface
# ══════════════════════════════════════════════════════════════════════════
class JarvisGUI:
    def __init__(self,root,cfg):
        self.root=root; self.cfg=cfg
        self.engine=JarvisEngine(cfg.get("gemini_api_key",""))
        self.running=True; self.phase=0.0
        self.is_listening=False; self.input_history=[]; self.hist_idx=-1
        self._gauge_vals={"cpu":0.38,"mem":0.62,"net":0.85,"arc":0.97}
        self._gauge_targets={"cpu":0.38,"mem":0.62,"net":0.85,"arc":0.97}
        self._setup_window()
        self._build_ui()
        self._animate()
        self._boot_chat()

    def _setup_window(self):
        self.root.title("J.A.R.V.I.S  —  The brain behind the brilliance.")
        self.root.geometry("1400x860")
        self.root.minsize(1100,720)
        self.root.configure(bg=C["bg0"])

    def _build_ui(self):
        self.root.grid_columnconfigure(0,weight=0,minsize=220)
        self.root.grid_columnconfigure(1,weight=1)
        self.root.grid_columnconfigure(2,weight=0,minsize=220)
        self.root.grid_rowconfigure(1,weight=1)
        self._make_header()
        self._make_left_panel()
        self._make_chat()
        self._make_right_panel()
        self._make_inputbar()
        self._make_statusbar()

    # ── HEADER ──────────────────────────────────────────────────────────
    def _make_header(self):
        self.hdr=tk.Canvas(self.root,height=90,bg=C["bg0"],highlightthickness=0)
        self.hdr.grid(row=0,column=0,columnspan=3,sticky="ew")
        self.hdr.bind("<Configure>",self._draw_header)
        self.root.after(80,self._draw_header)

    def _draw_header(self,event=None):
        cv=self.hdr; cv.delete("all")
        W=cv.winfo_width() or 1400; H=90
        draw_grid(cv,W,H,40)
        draw_scanlines(cv,W,H)
        # Background panels
        cv.create_rectangle(0,0,W,H,fill=C["bg1"],outline="")
        cv.create_rectangle(0,0,W,2,fill=C["neon"],outline="")
        cv.create_rectangle(0,H-2,W,H,fill=C["neon3"],outline="")
        # Left orb
        cx,cy=54,45
        for r,col in [(38,C["bg0"]),(36,C["neon3"]),(28,C["neon2"]),(18,C["neon"])]:
            circle(cv,cx,cy,r,C["bg0"] if r==38 else "",col,2 if r>28 else 1)
        circle(cv,cx,cy,12,C["neon"],C["neon"],tags="hcore")
        circle(cv,cx,cy,7,C["bg0"],"")
        # Crosshairs
        for x1,y1,x2,y2 in [(cx,cy-36,cx,cy-14),(cx,cy+14,cx,cy+36),
                              (cx-36,cy,cx-14,cy),(cx+14,cy,cx+36,cy)]:
            cv.create_line(x1,y1,x2,y2,fill=C["neon2"],width=1)

        # Title
        cv.create_text(108,22,text="J.A.R.V.I.S",font=(FF,28,"bold"),fill=C["neon"],anchor="w")
        cv.create_text(110,50,text="Just A Rather Very Intelligent System",
                       font=(FF,9),fill=C["txt2"],anchor="w")
        cv.create_text(110,65,text=JARVIS_INFO["tagline"],font=(FF,8),fill=C["neon3"],anchor="w")

        # Center — status + date
        cv.create_text(W//2,18,text=datetime.datetime.now().strftime("%A,  %B %d  %Y"),
                       font=(FF,8),fill=C["txt3"],anchor="center")
        self.hdr_clock=cv.create_text(W//2,44,text="",font=(MONO,20,"bold"),fill=C["neon"],anchor="center")
        self.hdr_status=cv.create_text(W//2,70,text="● ACTIVE",
                                        font=(FF,8,"bold"),fill=C["green"],anchor="center")

        # Right controls
        rx=W-20
        self.hdr_dot=cv.create_oval(rx-140,32,rx-126,46,fill=C["green"],outline="",tags="hdot")
        self.hdr_stxt2=cv.create_text(rx-120,39,text="ONLINE",font=(FF,9,"bold"),
                                       fill=C["green"],anchor="w",tags="hstxt")
        # Settings button
        cv.create_rectangle(rx-60,28,rx-4,58,fill=C["bg2"],outline=C["neon3"],width=1)
        cv.create_text(rx-32,43,text="⚙ CONFIG",font=(FF,8,"bold"),fill=C["txt2"],tags="settbtn")
        cv.tag_bind("settbtn","<Button-1>",lambda e:self._open_settings())

        # Separator line — gradient
        self.hdr.create_line(0,H-1,W,H-1,fill=C["neon3"],width=1)

        self._tick()

    # ── LEFT PANEL — gauges + system info ───────────────────────────────
    def _make_left_panel(self):
        self.left=tk.Canvas(self.root,width=220,bg=C["bg0"],highlightthickness=0)
        self.left.grid(row=1,column=0,sticky="nsew")
        self.left.bind("<Configure>",self._draw_left)
        self.root.after(100,self._draw_left)

        # Scrollable content via a real frame if needed
        self._lphase=0.0

    def _draw_left(self,event=None):
        cv=self.left; cv.delete("all")
        W=cv.winfo_width() or 220; H=cv.winfo_height() or 760
        draw_grid(cv,W,H,40)
        draw_scanlines(cv,W,H)
        cv.create_rectangle(0,0,W,H,fill=C["bg1"],outline="")
        # Right border
        cv.create_line(W-1,0,W-1,H,fill=C["neon3"],width=2)
        cv.create_line(W-3,0,W-3,H,fill=C["bg3"],width=1)

        y=14
        # Section header
        def sec_hdr(label,yy):
            cv.create_rectangle(0,yy,W,yy+22,fill=C["bg2"],outline="")
            cv.create_rectangle(0,yy,3,yy+22,fill=C["neon"],outline="")
            hud_text(cv,12,yy+5,label,8,C["neon"],bold=True)
            return yy+28

        y=sec_hdr("◈  SYSTEM STATUS",y)

        # Status badge
        sc={"ACTIVE":C["green"],"STANDBY":C["amber"],"OFFLINE":C["red"],
            "THINKING":C["neon"],"LISTENING":C["arc2"]}.get(self.engine.status,C["txt2"])
        stxt={"ACTIVE":"● ACTIVE","STANDBY":"◌ STANDBY","OFFLINE":"○ OFFLINE",
              "THINKING":"◎ THINKING","LISTENING":"◉ LISTENING"}.get(self.engine.status,self.engine.status)
        cv.create_rectangle(8,y,W-8,y+28,fill=C["bg0"],outline=sc,width=1,tags="status_badge")
        cv.create_text(W//2,y+14,text=stxt,font=(FF,10,"bold"),fill=sc,tags="status_lbl")
        y+=36

        # System info rows
        info=[("NAME","J.A.R.V.I.S",C["neon"]),("VER","3.1.0",C["txt"]),
              ("MODEL","GEMINI 2.5",C["neon2"]),("CREATOR","ESAN SAHOO",C["pink"]),
              ("BUILD","2025",C["gold"]),
              ("STT","READY" if SPEECH_AVAILABLE else "OFFLINE",C["green"] if SPEECH_AVAILABLE else C["red"]),
              ("TTS","READY" if TTS_AVAILABLE else "OFFLINE",C["green"] if TTS_AVAILABLE else C["red"]),
              ("AI","ONLINE" if (GEMINI_AVAILABLE and self.cfg.get("gemini_api_key")) else "LIMITED",
               C["green"] if (GEMINI_AVAILABLE and self.cfg.get("gemini_api_key")) else C["amber"])]
        for k,v,col in info:
            cv.create_line(8,y+16,W-8,y+16,fill=C["bg3"],width=1)
            hud_text(cv,12,y+2,k,7,C["txt3"])
            hud_text(cv,W-10,y+2,v,7,col,anchor="ne")
            y+=20

        y+=8
        y=sec_hdr("◈  DIAGNOSTICS",y)

        # Circular gauges
        gauges=[("CPU",self._gauge_vals["cpu"],C["green"]),
                ("MEM",self._gauge_vals["mem"],C["amber"]),
                ("NET",self._gauge_vals["net"],C["neon"]),
                ("ARC",self._gauge_vals["arc"],C["arc2"])]
        gx=[38,110,38,110]; gy_base=y
        for i,(lbl,val,col) in enumerate(gauges):
            gx2=gx[i]; gy=gy_base+(i//2)*90
            ring_gauge(cv,gx2,gy+36,28,val,col,C["bg2"],5)
            circle(cv,gx2,gy+36,20,C["bg1"],"")
            # Tick marks
            for deg in range(0,360,30):
                a=math.radians(deg)
                cv.create_line(gx2+29*math.cos(a),gy+36-29*math.sin(a),
                               gx2+33*math.cos(a),gy+36-33*math.sin(a),
                               fill=C["bg3"],width=1)
            cv.create_text(gx2,gy+32,text=f"{int(val*100)}%",font=(MONO,8,"bold"),fill=col)
            hud_text(cv,gx2,gy+42,lbl,6,C["txt3"],anchor="center")
        y=gy_base+190

        y=sec_hdr("◈  VOICE",y)
        self.voice_var=getattr(self,"voice_var",tk.BooleanVar(value=False))
        vf=tk.Frame(self.left,bg=C["bg1"])
        self.left.create_window(W//2,y+18,window=vf)
        tk.Label(vf,text="Speak responses",font=(FF,8),fg=C["txt2"],bg=C["bg1"]).pack(side="left")
        tk.Checkbutton(vf,variable=self.voice_var,bg=C["bg1"],fg=C["neon"],
                        activebackground=C["bg1"],selectcolor=C["bg2"],
                        command=self._toggle_voice).pack(side="left",padx=6)
        y+=40

        y=sec_hdr("◈  REMINDERS",y)
        if self.engine.reminders:
            for r in self.engine.reminders[-4:]:
                hud_text(cv,10,y+2,f"› {r['text'][:24]}",7,C["amber"])
                y+=18
        else:
            hud_text(cv,10,y+4,"No reminders set.",7,C["txt3"])
            y+=20

        y+=4
        y=sec_hdr("◈  QUICK CMD",y)
        cmds=[("⚡ WAKE","wake up",C["green"]),("💤 SLEEP","sleep",C["amber"]),
              ("🌐 GOOGLE","open google",C["neon2"]),("📷 YOUTUBE","open youtube",C["neon"]),
              ("🔐 LOCK","__lock__",C["pink"]),("🔴 SHUTDOWN","shutdown",C["red"])]
        for lbl,cmd,col in cmds:
            btn_tag=f"qcmd_{lbl}"
            cv.create_rectangle(8,y,W-8,y+20,fill=C["bg2"],outline=C["bg3"],width=1,tags=btn_tag)
            cv.create_rectangle(8,y,11,y+20,fill=col,outline="",tags=btn_tag)
            cv.create_text(W//2,y+10,text=lbl,font=(FF,8,"bold"),fill=col,tags=btn_tag)
            cv.tag_bind(btn_tag,"<Button-1>",lambda e,c=cmd:self._quick(c))
            cv.tag_bind(btn_tag,"<Enter>",lambda e,t=btn_tag:cv.itemconfig(t,fill=C["bg3"]))
            cv.tag_bind(btn_tag,"<Leave>",lambda e,t=btn_tag:cv.itemconfig(t,fill=C["bg2"]))
            y+=24

        self._left_status_badge="status_badge"
        self._left_status_lbl="status_lbl"

    # ── CHAT AREA ────────────────────────────────────────────────────────
    def _make_chat(self):
        outer=tk.Frame(self.root,bg=C["bg0"])
        outer.grid(row=1,column=1,sticky="nsew")
        outer.grid_rowconfigure(0,weight=1); outer.grid_columnconfigure(0,weight=1)

        # HUD overlay canvas behind chat
        self.chat_hud=tk.Canvas(outer,bg=C["bg0"],highlightthickness=0)
        self.chat_hud.place(x=0,y=0,relwidth=1,relheight=1)
        self.chat_hud.bind("<Configure>",self._draw_chat_hud)

        self.chat=scrolledtext.ScrolledText(
            outer,wrap=tk.WORD,bg=C["bg0"],fg=C["txt"],
            font=(FF,11),insertbackground=C["neon"],
            selectbackground=C["neon3"],selectforeground=C["txt"],
            relief="flat",bd=0,padx=28,pady=18,spacing1=2,spacing3=6)
        self.chat.grid(row=0,column=0,sticky="nsew")
        self.chat.config(state="disabled")

        self.chat.tag_configure("hdr_j",foreground=C["neon"],font=(FF,10,"bold"),spacing1=16)
        self.chat.tag_configure("msg_j",foreground=C["txt"],font=(FF,11),lmargin1=16,lmargin2=16)
        self.chat.tag_configure("hdr_u",foreground=C["amber"],font=(FF,10,"bold"),spacing1=16)
        self.chat.tag_configure("msg_u",foreground=C["amber"],font=(FF,11),lmargin1=16,lmargin2=16)
        self.chat.tag_configure("sys",foreground=C["txt3"],font=(MONO,8,"italic"),lmargin1=12)
        self.chat.tag_configure("div",foreground=C["bg3"],font=(FF,4))
        self.chat.tag_configure("err",foreground=C["red"],font=(FF,10))

    def _draw_chat_hud(self,event=None):
        cv=self.chat_hud; cv.delete("all")
        W=cv.winfo_width() or 900; H=cv.winfo_height() or 700
        draw_grid(cv,W,H,50)
        # Corner decorations
        for bx,by,sx,sy in [(0,0,1,1),(W,0,-1,1),(0,H,1,-1),(W,H,-1,-1)]:
            cv.create_line(bx,by,bx+sx*30,by,fill=C["neon3"],width=1)
            cv.create_line(bx,by,bx,by+sy*30,fill=C["neon3"],width=1)
        # Top label
        hud_text(cv,W//2,6,"NEURAL  INTERFACE  /  CONVERSATION  LOG",8,C["txt3"],anchor="center")
        cv.create_line(0,18,W,18,fill=C["bg3"],width=1)
        # Bottom label
        hud_text(cv,W//2,H-14,"STARK INDUSTRIES  ·  JARVIS NEURAL NET  v3.1",7,C["txt3"],anchor="center")

    # ── RIGHT PANEL — mini HUD panels ───────────────────────────────────
    def _make_right_panel(self):
        self.right=tk.Canvas(self.root,width=220,bg=C["bg0"],highlightthickness=0)
        self.right.grid(row=1,column=2,sticky="nsew")
        self.right.bind("<Configure>",self._draw_right)
        self.root.after(120,self._draw_right)

    def _draw_right(self,event=None):
        cv=self.right; cv.delete("all")
        W=cv.winfo_width() or 220; H=cv.winfo_height() or 760
        draw_grid(cv,W,H,40)
        draw_scanlines(cv,W,H)
        cv.create_rectangle(0,0,W,H,fill=C["bg1"],outline="")
        cv.create_line(0,0,0,H,fill=C["neon3"],width=2)
        cv.create_line(2,0,2,H,fill=C["bg3"],width=1)

        def sec_hdr(label,yy):
            cv.create_rectangle(0,yy,W,yy+22,fill=C["bg2"],outline="")
            cv.create_rectangle(W-3,yy,W,yy+22,fill=C["neon"],outline="")
            hud_text(cv,W-12,yy+5,label,8,C["neon"],anchor="ne",bold=True)
            return yy+28

        y=14
        y=sec_hdr("STATUS  ◈",y)

        # Big circular arc gauge — Arc Reactor power
        cx=W//2; cy=y+58
        ring_gauge(cv,cx,cy,50,self._gauge_vals["arc"],C["arc2"],C["bg2"],8)
        ring_gauge(cv,cx,cy,40,self._gauge_vals["cpu"],C["green"],C["bg2"],5)
        ring_gauge(cv,cx,cy,30,self._gauge_vals["mem"],C["amber"],C["bg2"],4)
        circle(cv,cx,cy,22,C["bg1"],"")
        circle(cv,cx,cy,16,"",C["neon"],1)
        cv.create_text(cx,cy-4,text="ARC",font=(FF,7),fill=C["txt3"])
        cv.create_text(cx,cy+6,text=f"{int(self._gauge_vals['arc']*100)}%",
                       font=(MONO,8,"bold"),fill=C["arc2"])
        # Tick marks
        for deg in range(0,360,15):
            a=math.radians(deg)
            r1,r2=52,(56 if deg%45==0 else 54)
            cv.create_line(cx+r1*math.cos(a),cy-r1*math.sin(a),
                           cx+r2*math.cos(a),cy-r2*math.sin(a),fill=C["neon3"],width=1)
        y=cy+70

        y=sec_hdr("NETWORK  ◈",y)
        # Waveform
        pts=[]
        for i in range(W-16):
            v=math.sin(i*0.15+self.phase*3)*12+math.sin(i*0.3+self.phase)*5
            pts+=[8+i,y+22+v]
        if len(pts)>=4: cv.create_line(*pts,fill=C["neon"],width=1,smooth=True)
        cv.create_line(8,y+22,W-8,y+22,fill=C["bg3"],width=1,dash=(2,4))
        for label,val in [("UPLINK","SECURE"),("PING","<1ms"),("BWIDTH","FULL")]:
            cv.create_line(8,y+48,W-8,y+48,fill=C["bg3"],width=1)
            hud_text(cv,10,y+34,label,6,C["txt3"])
            hud_text(cv,W-10,y+34,val,6,C["neon2"],anchor="ne")
            y+=16
        y+=28

        y=sec_hdr("TELEMETRY  ◈",y)
        tele=[("TEMP","36.4°C",C["green"]),("LOAD","38%",C["green"]),
              ("PROC","QUANTUM",C["neon2"]),("NODES","2,048",C["neon"]),
              ("LATENCY","<1ms",C["green"]),("UPTIME",self._uptime(),C["txt"])]
        for lbl,val,col in tele:
            cv.create_line(8,y+18,W-8,y+18,fill=C["bg3"],width=1)
            hud_text(cv,10,y+2,lbl,7,C["txt3"])
            hud_text(cv,W-10,y+2,val,7,col,anchor="ne")
            y+=22
        y+=6

        y=sec_hdr("API KEY  ◈",y)
        key=self.cfg.get("gemini_api_key","")
        ks="CONFIGURED ✓" if key else "NOT SET"
        kc=C["green"] if key else C["amber"]
        cv.create_rectangle(8,y,W-8,y+28,fill=C["bg0"],outline=kc,width=1)
        hud_text(cv,W//2,y+8,ks,8,kc,anchor="center",bold=True)
        y+=36

        if not key:
            hud_text(cv,W//2,y,"⚙ Click CONFIG in header",7,C["amber"],anchor="center")
            y+=16
            hud_text(cv,W//2,y,"to add your Gemini key",7,C["txt3"],anchor="center")
            y+=20

        y=sec_hdr("SECURITY  ◈",y)
        has_pw="Password ✓" if self.cfg.get("password") else "No password"
        has_vp="Voice ✓" if self.cfg.get("voice_passphrase") else "No voice phrase"
        has_face="Face ID ✓" if CV_AVAILABLE else "Face ID: offline"
        for txt,col in [(has_pw,C["green"] if self.cfg.get("password") else C["txt3"]),
                        (has_vp,C["green"] if self.cfg.get("voice_passphrase") else C["txt3"]),
                        (has_face,C["green"] if CV_AVAILABLE else C["txt3"])]:
            hud_text(cv,10,y,f"› {txt}",7,col)
            y+=18

    def _uptime(self):
        t=int(time.time()-self._start_time) if hasattr(self,"_start_time") else 0
        if not hasattr(self,"_start_time"): self._start_time=time.time()
        h,r=divmod(t,3600); m,s=divmod(r,60)
        return f"{h:02d}:{m:02d}:{s:02d}"

    # ── INPUT BAR ────────────────────────────────────────────────────────
    def _make_inputbar(self):
        wrap=tk.Canvas(self.root,height=60,bg=C["bg1"],highlightthickness=0)
        wrap.grid(row=2,column=0,columnspan=3,sticky="ew")
        wrap.bind("<Configure>",self._draw_inputbar_bg)

        self._input_wrap=wrap
        self._start_time=time.time()

        # Actual input widgets on top
        inner=tk.Frame(self.root,bg=C["bg1"])
        inner.grid(row=2,column=0,columnspan=3,sticky="ew")
        inner.grid_columnconfigure(1,weight=1)
        tk.Frame(inner,bg=C["neon"],height=2).grid(row=0,column=0,columnspan=5,sticky="ew")
        tk.Label(inner,text="›",font=(FF,20,"bold"),fg=C["neon"],bg=C["bg1"]
                 ).grid(row=1,column=0,padx=(14,6),pady=10)
        self.in_var=tk.StringVar()
        self.in_box=tk.Entry(inner,textvariable=self.in_var,font=(FF,12),
                              fg=C["txt"],bg=C["bg1"],insertbackground=C["neon"],
                              relief="flat",bd=0)
        self.in_box.grid(row=1,column=1,sticky="ew",padx=(0,8),pady=10)
        self.in_box.bind("<Return>",lambda e:self._send())
        self.in_box.bind("<Up>",self._hist_up)
        self.in_box.bind("<Down>",self._hist_down)
        self.in_box.focus()
        tk.Frame(inner,bg=C["bg3"],width=1).grid(row=1,column=2,sticky="ns",pady=6)
        self.mic_btn=tk.Button(inner,text="🎤",font=(FF,14),fg=C["neon"],bg=C["bg1"],
                                activeforeground=C["bg0"],activebackground=C["neon"],
                                relief="flat",bd=0,cursor="hand2",padx=12,pady=10,
                                command=self._mic_click)
        self.mic_btn.grid(row=1,column=3,padx=2)
        tk.Button(inner,text="SEND  ▶",font=(FF,10,"bold"),fg=C["bg0"],bg=C["neon"],
                  activeforeground=C["bg0"],activebackground=C["neon2"],
                  relief="flat",bd=0,cursor="hand2",padx=20,pady=10,
                  command=self._send).grid(row=1,column=4,padx=(4,14))

    def _draw_inputbar_bg(self,event=None): pass

    # ── STATUS BAR ───────────────────────────────────────────────────────
    def _make_statusbar(self):
        self.statusbar=tk.Label(self.root,
                 text=f"   J.A.R.V.I.S v{JARVIS_INFO['version']}  ·  Creator: {JARVIS_INFO['creator']}  ·  {JARVIS_INFO['model']}  ·  © 2025 Stark Industries",
                 font=(MONO,7),fg=C["txt3"],bg=C["bg0"],anchor="w")
        self.statusbar.grid(row=3,column=0,columnspan=3,sticky="ew",padx=6,pady=2)

    # ── ANIMATION LOOP ───────────────────────────────────────────────────
    def _animate(self):
        if not self.running: return
        self.phase+=0.05

        # Pulse header orb
        g=min(255,int(200+55*math.sin(self.phase)))
        try: self.hdr.itemconfig("hcore",fill=f"#00{g:02x}ff",outline=f"#00{g:02x}ff")
        except: pass

        # Status colors
        sc={"ACTIVE":C["green"],"STANDBY":C["amber"],"OFFLINE":C["red"],
            "THINKING":C["neon"],"LISTENING":C["arc2"]}.get(self.engine.status,C["txt2"])
        stxt2={"ACTIVE":"● ACTIVE","STANDBY":"◌ STANDBY","OFFLINE":"○ OFFLINE",
               "THINKING":"◎ THINKING","LISTENING":"◉ LISTENING"}.get(self.engine.status,self.engine.status)
        blink=sc if math.sin(self.phase*3)>-0.2 else C["bg3"]
        try:
            self.hdr.itemconfig("hdot",fill=blink)
            self.hdr.itemconfig("hstxt",text=self.engine.status,fill=sc)
            self.hdr.itemconfig(self.hdr_status,text=stxt2,fill=sc)
        except: pass

        # Smoothly animate gauge values
        for k in self._gauge_vals:
            diff=self._gauge_targets[k]-self._gauge_vals[k]
            self._gauge_vals[k]+=diff*0.08
        # Randomise targets occasionally
        if random.random()<0.01:
            self._gauge_targets["cpu"]=random.uniform(0.25,0.75)
            self._gauge_targets["mem"]=random.uniform(0.45,0.80)
            self._gauge_targets["net"]=random.uniform(0.60,0.95)

        # Redraw dynamic panels every ~10 frames
        if int(self.phase*20)%10==0:
            try: self._draw_left()
            except: pass
            try: self._draw_right()
            except: pass

        self.root.after(45,self._animate)

    def _tick(self):
        try:
            t=datetime.datetime.now().strftime("%H:%M:%S")
            self.hdr.itemconfig(self.hdr_clock,text=t)
        except: pass
        self.root.after(1000,self._tick)

    # ── CHAT HELPERS ─────────────────────────────────────────────────────
    def _log(self,text,tag,nl=True):
        self.chat.config(state="normal")
        self.chat.insert("end",text+("\n" if nl else ""),tag)
        self.chat.see("end")
        self.chat.config(state="disabled")

    def _send(self):
        msg=self.in_var.get().strip()
        if not msg: return
        self.in_var.set(""); self.input_history.insert(0,msg); self.hist_idx=-1
        ts=datetime.datetime.now().strftime("%H:%M")
        self._log(f"\n  YOU  ›  {ts}","hdr_u")
        self._log(f"  {msg}","msg_u")
        self._log("  "+"─"*72,"div")
        threading.Thread(target=self._process,args=(msg,),daemon=True).start()

    def _process(self,msg):
        self.engine.status="THINKING"
        self._log("\n  J.A.R.V.I.S  ›  Processing…","hdr_j")
        resp,action=self.engine.process(msg)
        self.chat.config(state="normal"); self.chat.delete("end-2l","end-1l"); self.chat.config(state="disabled")
        clean=resp
        if "OPEN_URL:" in resp:
            m=re.search(r"OPEN_URL:(\S+)",resp)
            if m:
                url=m.group(1); clean=re.sub(r"OPEN_URL:\S+","",resp).strip()
                self.root.after(400,lambda u=url:webbrowser.open(u))
        if "REMINDER:" in resp:
            clean=re.sub(r"REMINDER:[^\n]+","",resp).strip()
        ts=datetime.datetime.now().strftime("%H:%M")
        self._log(f"\n  J.A.R.V.I.S  ›  {ts}","hdr_j")
        self._log(f"  {clean}","msg_j")
        self._log("  "+"─"*72,"div")
        threading.Thread(target=self.engine.speak,args=(clean,),daemon=True).start()
        if action=="shutdown": self.engine.status="OFFLINE"; self.root.after(3000,self.root.quit)
        else: self.engine.status="ACTIVE"

    def _hist_up(self,_):
        if self.input_history and self.hist_idx<len(self.input_history)-1:
            self.hist_idx+=1; self.in_var.set(self.input_history[self.hist_idx])

    def _hist_down(self,_):
        if self.hist_idx>0: self.hist_idx-=1; self.in_var.set(self.input_history[self.hist_idx])
        else: self.hist_idx=-1; self.in_var.set("")

    def _quick(self,cmd):
        if cmd=="__lock__": self._do_lock(); return
        if cmd=="__settings__": self._open_settings(); return
        self.in_var.set(cmd); self._send(); self.in_box.focus()

    def _toggle_voice(self):
        self.engine.voice_on=self.voice_var.get()
        self._log(f"  Voice output {'ENABLED' if self.engine.voice_on else 'DISABLED'}.","sys")

    def _open_settings(self):
        def on_save():
            pass
        SettingsDialog(self.root,self.cfg,self.engine,on_save)

    def _do_lock(self):
        self.root.withdraw()
        LockScreen(self.root,self.cfg,lambda:self.root.deiconify())

    def _mic_click(self):
        if not SPEECH_AVAILABLE:
            msgbox.showwarning("Voice Unavailable",
                "Install:\n  pip install SpeechRecognition pyaudio"); return
        if self.is_listening:
            self.is_listening=False; self.mic_btn.config(fg=C["neon"],text="🎤")
            self.engine.status="ACTIVE"; self._log("  Voice cancelled.","sys"); return
        self.is_listening=True; self.mic_btn.config(fg=C["red"],text="⏹")
        self.engine.status="LISTENING"
        threading.Thread(target=self._voice_thread,daemon=True).start()

    def _voice_thread(self):
        def upd(m): self._log(f"  🎤  {m}","sys")
        self._log("  Microphone active — speak now…","sys")
        result=self.engine.listen(cb=upd)
        self.is_listening=False; self.mic_btn.config(fg=C["neon"],text="🎤")
        if result.startswith("ERR:"):
            code=result[4:]
            errs={"NO_MODULE":"SpeechRecognition not installed.",
                  "NO_RECOGNIZER":"Recognizer failed.",
                  "TIMEOUT":"No speech detected (8s).",
                  "UNCLEAR":"Audio unclear."}
            if code.startswith("MICROPHONE:"): msg2=f"Mic error: {code[11:]}"
            elif code.startswith("NETWORK:"):   msg2=f"Network error: {code[8:]}"
            elif code.startswith("UNKNOWN:"):   msg2=f"Error: {code[8:]}"
            else: msg2=errs.get(code,f"Error [{code}]")
            self._log(f"  ✗  {msg2}","err"); self.engine.status="ACTIVE"
        else:
            self._log(f"  ✓  Heard: \"{result}\"","sys")
            self.in_var.set(result); self._send()

    def _boot_chat(self):
        lines=[
            "  ╔══════════════════════════════════════════════════════════╗",
            "  ║      J.A.R.V.I.S  —  SYSTEM INITIALIZATION COMPLETE      ║",
            "  ╚══════════════════════════════════════════════════════════╝\n",
            f"  Neural Engine  :  {JARVIS_INFO['model']}",
            "  Voice Synth    :  "+("ONLINE" if TTS_AVAILABLE else "OFFLINE  (pip install pyttsx3)"),
            "  Speech Input   :  "+("ONLINE" if SPEECH_AVAILABLE else "OFFLINE  (pip install SpeechRecognition)"),
            "  Gemini AI      :  "+("ONLINE ✓" if (GEMINI_AVAILABLE and self.cfg.get("gemini_api_key")) else "LIMITED  —  add API key via CONFIG button"),
            "  Face ID        :  "+("READY" if CV_AVAILABLE else "OFFLINE  (pip install opencv-python numpy)"),
            "  Boot Status    :  ALL SYSTEMS NOMINAL\n",
        ]
        def show(i):
            if i<len(lines): self._log(lines[i],"sys"); self.root.after(280,lambda:show(i+1))
            else: greet()
        def greet():
            h=datetime.datetime.now().hour
            tod="morning" if h<12 else "afternoon" if h<17 else "evening"
            g=(f"Good {tod}, sir.  I am J.A.R.V.I.S — Just A Rather Very Intelligent System.\n"
               f"  Created by {JARVIS_INFO['creator']}  ·  {JARVIS_INFO['tagline']}\n\n"
               f"  All systems fully operational.  Awaiting your command.")
            self._log(f"\n  J.A.R.V.I.S  ›  {datetime.datetime.now().strftime('%H:%M')}","hdr_j")
            self._log(f"  {g}","msg_j"); self._log("  "+"─"*72,"div")
            self.engine.status="ACTIVE"
            threading.Thread(target=self.engine.speak,args=(g,),daemon=True).start()
        show(0)


# ══════════════════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════════════════
def main():
    global FF, MONO
    print("━"*64)
    print("  J.A.R.V.I.S — Just A Rather Very Intelligent System")
    print(f"  Creator: {JARVIS_INFO['creator']}  |  Model: {JARVIS_INFO['model']}")
    print("━"*64)

    root=tk.Tk(); root.withdraw()
    import tkinter.font as tkfont
    avail=set(tkfont.families())
    for f in ["Segoe UI Variable","Segoe UI","SF Pro Display","Inter","Helvetica Neue","Arial","Helvetica"]:
        if f in avail: FF=f; break
    if FF is None: FF="Helvetica"
    for f in ["Consolas","Cascadia Code","JetBrains Mono","Courier New","Courier"]:
        if f in avail: MONO=f; break
    if MONO is None: MONO="Courier"

    cfg=load_config()
    if not cfg.get("gemini_api_key") and os.environ.get("GEMINI_API_KEY"):
        cfg["gemini_api_key"]=os.environ["GEMINI_API_KEY"]

    gui_ref=[None]

    def after_title():
        def after_lock():
            root.deiconify()
            gui_ref[0]=JarvisGUI(root,cfg)
        if cfg.get("lock_on_start",True):
            LockScreen(root,cfg,after_lock)
        else:
            after_lock()

    TitleScreen(root,on_continue=after_title)
    root.protocol("WM_DELETE_WINDOW",root.destroy)
    root.mainloop()

if __name__=="__main__":
    main()
