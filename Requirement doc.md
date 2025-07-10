# User Stories: 
   ## Customer:
   ### Success path:
      Come to the website -> click reservation icon -> pick a date from the calendar → select party size -> show available time slots(with customer party size) → Confirm -> system will send back the confirm message(email or phone message)

   ### Fail path:
      If slot availability changes or network fails -> show an error “Sorry, that slot just filled, please choose another.” or " Network error, please try again.” -> the information will remain so user can correct and resubmit

   ## Front-Desk Employee:
   ### Success path: 
      Receive customer reservation information from the system -> auto confirmed by system and the customer gets a notification: “Your reservation has been reviewed and is confirmed.” -> store the reservation information in the system

   ### Fail path:
      If reservation page have some error(ex: lost internet connection) -> show an error "Sorry, connection lost, please try later" -> employee should contact tech team to solve the problem

   ## Manager 
      In this case I don't think manager need to receive any information about reservation, only when the website lost connect, the employ need to tell manager to let manager understand the situation

# Functional requirements

   1. Customer can use their name and phone number to make a reservation
   2. After make the reservation, customer can use phone number to check their reservation information and receive the confirm information via phone message
   3. Customer can cancel and view their reservation.
   4. Customer cannot update their reservation such as change the party size, change the time slop. If they want to do this, they need to make the reservation again
   5. Same number cannot have two reservation in same section(lunch or dinner). Customer need to cancel one reservation first so can make another reservation.
   6. Cancel the reservation if customer don't show up in 10 min with their reservation time
   7. Employee can use phone number to check customer reservation information when they checkin

# Non-Functional requirements

   ## Performance

   1. User can complete the reservation within 30 sec

   ## Security

   1. Use standard algorithem (Such as SHA 256) to encrypted sensitive data (customer name and phone number).

   ## Simplicity

   1. Should let user easily to understand how to use the reservation page to make a reservation. Such as less than 10 steps to complete the reservation 
 

