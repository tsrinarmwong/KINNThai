# User Stories: 
   ## Customer:
   ### Success path:
      Come to the website -> click reservation icon -> change to the reservation page -> input customer information ( name ) -> pick a date from the calendar → select party size -> show available time slots(with customer party size) → click confirm -> system ( use Toast) will send back the notification(via email or phone message. Include confirm message)

   ### Fail path:
      1. If slot availability changes during customer make the reservation -> show an error “Sorry, that slot just filled, please choose another.” after customer click confirm -> the information will remain so user can correct and resubmit

      2. If network fails -> show an error " Network error, please try again later.” when change to the reservation page


   ## Front-Desk Employee:
   ### Success path: 
      Receive customer reservation information from the system -> auto confirmed by system and the customer gets a notification include confirm message (“Your reservation has been reviewed and is confirmed.”) from phone message or email -> store the reservation information on the notebook right at the counter to help employee track who is coming and customer checkin

   ### Fail path:
      If reservation page have some error(ex: lost internet connection) -> show an error " Network error, please try again later.” -> employee should contact tech team to solve the problem

   ## Manager 
      In this case I don't think manager need to receive any information about reservation, only when the website lost connect, the employ need to tell manager to let manager understand the situation

# Functional requirements

   1. Customer can use their name to make a reservation

   2. Customer will received the notification via phone message or email, and the message will includ a confirm message. 

   3. If customer want to update their reservation information, such as change party size, change time slot, cancel the reservation, they need to give a call to the restauran
      to ask the employee to update the reservation. Customer cannot do these update in the notification

   4. Same number cannot have two reservation in same section(lunch or dinner). Customer need to cancel one reservation first so can make another reservation

   5. Cancel the reservation if customer don't show up in 10 min with their reservation time

   6. Employee can use customer name and party size to check customer reservation information when they checkin

# Non-Functional requirements

   ## Performance

   1. User can complete the reservation within 30 sec

   ## Security

   1. Use standard algorithem (Such as SHA 256) to encrypted sensitive data (customer name and phone number).

   ## Simplicity

   1. Should let user easily to understand how to use the reservation page to make a reservation. Such as less than 10 steps to complete the reservation 
 

 # Edge case

 ## Party size error 
   When a user submits a reservation with party size = 0, the system should return an error message "Party size must be at least 1"

 ## Invalid input format
   When the customer input the wrong content, such as customer input number in name space, the system should show the error message "Invalid data format, expected First name, Last name"

 ## Missing required fields
   If the customer click the confirm button but they miss required fields, such as party size, the system shouldn't let the customer finish the reservation process. 
   The system should show the message "Miss required fields, please finish all required fields"

## Network timeout
   If customer stop at the resrvation pages more than 10 min, the system will automatically show the message "Request timed out. Please try again." and ask the customer to re-write the reservation information again

## Spam / Unserious request
   1. If the party size is more than 6 people, the customer need to give a call to make the reservation