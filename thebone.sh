ffmpeg -i http://14013.live.streamtheworld.com/KSANFM.mp3 -acodec pcm_s16le -ar 44100 -listen 1 -f wav http://0.0.0.0:5000/main.wav & curl http://0.0.0.0:3000/uploadurl?url=http://0.0.0.0:5000/main.wav