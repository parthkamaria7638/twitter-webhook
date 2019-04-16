import smtplib
import os
import sys

toemail = sys.argv[1]
body = sys.argv[2]
print(toemail)
print(body)

EMAIL = 'complaintbotsen@gmail.com'
PASS = 'comp11$$'

toaddrs = []
toaddr = toemail
cc = ['']
bcc = []
fromaddr = EMAIL
message_subject = "Regarding your complaint"
message_text = body
message = "From: %s\r\n" % fromaddr + "To: %s\r\n" % toaddr + "CC: %s\r\n" % ",".join(cc) + "Subject: %s\r\n" % message_subject + "\r\n" + message_text
toaddrs = [toaddr] + cc + bcc
server = smtplib.SMTP_SSL('smtp.gmail.com:465')
server.ehlo()
#server.starttls()
server.login(EMAIL,PASS)
server.set_debuglevel(1)
server.sendmail(fromaddr, toaddrs, message)
server.quit()    