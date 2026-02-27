from tkinter import *
from tkinter import messagebox
from PIL import Image, ImageTk
from virus import msg
from window2 import topwin
root = Tk()
root.title("Denomination Calculator")
root.geometry("650x400")
upload = Image.open("app_image.jpg")
upload = upload.resize((300, 300))
image = ImageTk.PhotoImage(upload)
Label = Label(root, image=image, bg="LightBlue")
Label.place(x=180, y=20)
Label1 = Label(root, text="Hey! user welcome to the denomination counter app", bg="LightBlue")
Label1.place(relx=0.5, y=0.1, anchor=CENTER)
def Msg():
    Msgbox = messagebox.showinfo(
    "Alert", "Do you want to calculate the denomination count?")
    if Msgbox == 'ok':
        topwin()

button1 = Button(root,
    text="Let's get started!"),
    command=msg,
    bg="brown",
    fg="white",
button1.place(x=260, y=350)
def topwin():
    top = Toplevel(root)
    top.title("Currency Denomination Counter")
    top.configure(bg='grey')
    top.geometry("600x400")
    label.place(x=230, y=50)
    entry.place(x=200, y=80)
    btn.place(x=240, y=120)
    lb1.place(x=140, y=178)

    t1.place(x=270, y=200)
    t2.place(x=270, y=270)
    t3.place(x=270, y=260)

    top.mainloop()

root.mainloop()




