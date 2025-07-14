# User Stories: 
   ## Customer:
   ### Success path:
      Come to the website -> click reservation icon -> change to the reservation page -> input customer information ( name and phone number ) -> pick a date from the calendar → select party size -> show available time slots(with customer party size) → click confirm -> system ( use 3rd party tool (ex: Toast) or implement by engineers) will send back the notification(via email or phone message. Include confirm message and a link)

   ### Fail path:
      1. If slot availability changes during customer make the reservation -> show an error “Sorry, that slot just filled, please choose another.” after customer click confirm -> the information will remain so user can correct and resubmit

      2. If network fails -> show an error " Network error, please try again later.” when change to the reservation page


   ## Front-Desk Employee:
   ### Success path: 
      Receive customer reservation information from the system -> auto confirmed by system and the customer gets a notification include confirm message (“Your reservation has been reviewed and is confirmed.”) and a link(can lead to the reservation pages and see the reservation information) from phone message or email -> store the reservation information in the system to help customer checkin

   ### Fail path:
      If reservation page have some error(ex: lost internet connection) -> show an error " Network error, please try again later.” -> employee should contact tech team to solve the problem

   ## Manager 
      In this case I don't think manager need to receive any information about reservation, only when the website lost connect, the employ need to tell manager to let manager understand the situation

# Functional requirements

   1. Customer can use their name and phone number to make a reservation

   2. Customer will received the notification via phone message or email, and the message will includ a confirm message and a link. The link can lead to the reservation
      page, and user can update the information in the reservation page

   3. Customer can use the link in the notification to check the reservation information

   4. Customer can cancel their reservation via the link in the notification

   5. If customer want to update their reservation information, such as change party size, change time slot, they need to give a call to the restaurant to ask the employee to
      update the reservation. Customer cannot do these update via the link in the notification

   6. Same number cannot have two reservation in same section(lunch or dinner). Customer need to cancel one reservation first so can make another reservation

   7. Cancel the reservation if customer don't show up in 10 min with their reservation time

   8. Employee can use phone number last 4 digit (ex 4063 ) to check customer reservation information when they checkin

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
   When the customer input the wrong content, such as input number in name space, the system should show the error message "Invalid data format, expected First name, Last name"

 ## Missing required fields
   If the customer click the confirm button but they miss required fields, such as party size, the system shouldn't let the customer finish the reservation process. 
   The system should show the message "Miss required fields, please finish all required fields"

## Network timeout
   If customer stop at the resrvation pages more than 10 min, the system will automatically show the message "Request timed out. Please try again." and ask the customer to re-write the reservation information again