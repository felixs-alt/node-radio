ffmpeg -f dshow -i audio="Microphone (Realtek(R) Audio)" -c copy -listen 1 -f wav http://0.0.0.0:5000/main.wav