import googletrans
import speech_recognition
import gtts
recognizer = speech_recognition.Recognizer()
with speech_recognition.Microphone() as source:
  print("Hey Aio")
  voice = recognizer.listen(source)
  text = recognizer.recognize_google(voice,language="en")
  print(text)
translator = googletrans.Translator()
translation = translator.translate(text,dest="hi")
print(translation.text)
converted_audio = gtts.gTTS(translation.text, lang="hi")
converted_audio.save("hello.mp3")

