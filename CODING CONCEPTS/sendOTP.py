import random
from twilio.rest import Client

# ============================================
# TWILIO CONFIGURATION
# ============================================

# Your Twilio Account SID
account_sid = "ACd8336b6adc5e89b1e47add23e40f1419"

# Your Twilio Auth Token
auth_token = "bf211ec90a5accdfcf1c739e71ddc185"

# Your Twilio Phone Number
twilio_phone_number = "+918763679208"

# ============================================
# CREATE TWILIO CLIENT
# ============================================

client = Client(account_sid, auth_token)

# ============================================
# GENERATE OTP FUNCTION
# ============================================

def generate_otp():
    """
    Generate a random 6-digit OTP
    """
    otp = random.randint(100000, 999999)
    return otp

# ============================================
# SEND OTP FUNCTION
# ============================================

def send_otp(phone_number, otp):
    """
    Send OTP via SMS using Twilio
    """

    message = client.messages.create(
        body=f"Your OTP is: {otp}",
        from_=twilio_phone_number,
        to=phone_number
    )

    print("\nOTP SENT SUCCESSFULLY!")
    print("Message SID:", message.sid)

# ============================================
# MAIN PROGRAM
# ============================================

print("========== OTP VERIFICATION SYSTEM ==========\n")

# User enters phone number
phone_number = input("Enter phone number with country code: ")

# Generate OTP
otp = generate_otp()

# Send OTP
send_otp(phone_number, otp)

# ============================================
# VERIFY OTP
# ============================================

user_otp = input("\nEnter the OTP you received: ")

if user_otp == str(otp):
    print("\nPHONE NUMBER VERIFIED SUCCESSFULLY!")
else:
    print("\nINVALID OTP!")