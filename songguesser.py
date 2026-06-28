import asyncio
import threading
import tkinter as tk
from tkinter import filedialog, font
from shazamio import Shazam, Serialize

class ModernSongGuesser:
    def __init__(self, root):
        self.root = root
        self.root.title("SONICA // Audio Identifier")
        self.root.geometry("460x550")
        self.root.configure(bg="#121214") # Premium dark charcoal background
        self.root.resizable(False, False)
        
        self.shazam = Shazam()
        
        # Define clean, modern typography
        self.title_font = font.Font(family="Segoe UI", size=28, weight="bold")
        self.subtitle_font = font.Font(family="Segoe UI", size=9, weight="bold")
        self.main_font = font.Font(family="Segoe UI", size=18, weight="bold")
        self.sub_font = font.Font(family="Segoe UI", size=12)
        self.btn_font = font.Font(family="Segoe UI", size=11, weight="bold")

        # --- UI LAYOUT ---

        # Header Title
        self.title_label = tk.Label(
            root, text="SONICA", font=self.title_font, 
            fg="#BB86FC", bg="#121214" # Neon Purple accent
        )
        self.title_label.pack(pady=(45, 2))

        self.subtitle_label = tk.Label(
            root, text="GLOBAL ACOUSTIC SEARCH", font=self.subtitle_font, 
            fg="#7A7A85", bg="#121214"
        )
        self.subtitle_label.pack(pady=(0, 35))

        # Main Central Display Card (Simulating a sleek glass container)
        self.card = tk.Frame(root, bg="#1E1E24", bd=0)
        self.card.place(relx=0.5, rely=0.45, width=380, height=220, anchor="center")

        self.status_icon = tk.Label(self.card, text="🎵", font=("Segoe UI", 40), fg="#BB86FC", bg="#1E1E24")
        self.status_icon.pack(pady=(30, 10))

        self.track_title = tk.Label(
            self.card, text="Ready to Identify", font=self.main_font, 
            fg="#FFFFFF", bg="#1E1E24", wraplength=340
        )
        self.track_title.pack(pady=2)

        self.track_artist = tk.Label(
            self.card, text="Upload an audio snippet below", font=self.sub_font, 
            fg="#A1A1AA", bg="#1E1E24", wraplength=340
        )
        self.track_artist.pack(pady=2)

        # Flat, Modern Action Button
        self.upload_btn = tk.Button(
            root, text="IDENTIFY AUDIO FILE", font=self.btn_font,
            fg="#FFFFFF", bg="#6200EE", activeforeground="#FFFFFF", activebackground="#3700B3",
            bd=0, cursor="hand2", command=self.start_thread
        )
        # Positioned elegantly near the bottom
        self.upload_btn.place(relx=0.5, rely=0.82, width=300, height=50, anchor="center")

        # Subtle Status Footer
        self.footer = tk.Label(root, text="Engine status: Operational", font=("Segoe UI", 8), fg="#4A4A52", bg="#121214")
        self.footer.pack(side="bottom", pady=15)

    # --- THREADED IDENTIFICATION ENGINE ---

    def start_thread(self):
        """Launches file picker and processing without freezing the window."""
        file_path = filedialog.askopenfilename(
            title="Select Audio Snippet",
            filetypes=[("Audio Files", "*.mp3 *.wav *.m4a *.ogg *.flac")]
        )
        if file_path:
            self.set_ui_searching()
            threading.Thread(target=self.run_async, args=(file_path,), daemon=True).start()

    def run_async(self, file_path):
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(self.process_audio(file_path))

    async def process_audio(self, file_path):
        try:
            result = await self.shazam.recognize_song(file_path)
            if not result.get('track'):
                self.set_ui_no_match()
                return

            track_info = Serialize.full_track(result)
            self.set_ui_success(track_info.title, track_info.artist)
        except Exception:
            self.set_ui_error()

    # --- VISUAL STATE CONTROLLERS ---

    def set_ui_searching(self):
        self.status_icon.config(text="⚡")
        self.track_title.config(text="Listening...")
        self.track_artist.config(text="Analyzing acoustic fingerprint...")
        self.upload_btn.config(state="disabled", bg="#333333", text="PROCESSING...")

    def set_ui_success(self, title, artist):
        self.status_icon.config(text="✨")
        self.track_title.config(text=title)
        self.track_artist.config(text=artist)
        self.upload_btn.config(state="normal", bg="#6200EE", text="IDENTIFY AUDIO FILE")

    def set_ui_no_match(self):
        self.status_icon.config(text="❌")
        self.track_title.config(text="Unknown Track")
        self.track_artist.config(text="Could not match sound blueprint.")
        self.upload_btn.config(state="normal", bg="#6200EE", text="TRY DIFFERENT FILE")

    def set_ui_error(self):
        self.status_icon.config(text="⚠️")
        self.track_title.config(text="Network Error")
        self.track_artist.config(text="Check internet connection.")
        self.upload_btn.config(state="normal", bg="#6200EE", text="RETRY IDENTIFICATION")

if __name__ == "__main__":
    root = tk.Tk()
    app = ModernSongGuesser(root)
    root.mainloop()