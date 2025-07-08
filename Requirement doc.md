# Functional requirements

## User Stories: 
Come to the website -> click reservation icon -> pick a date from the calendar → select party size -> show available time slots(with customer party size) → Confirm

## User Interface Requirements( one page )

1. Customer name field

   Label: “Customer Name”
   Input Type: single-line text input
   Placeholder: “e.g. Kevin”
   Constraints: Required

2. Date picker

   Label: “Reservation Date”
   Input Type: date-picker widget (calendar pop-up)
   Placeholder: “e.g. Current day (EX: 07-08)”
   Constraints: Required

3. Party size selector

   Label: “Party Size”
   Input Type: dropdown
   Placeholder: “e.g. 2”
   Constraints: Required

4. Time slots

   Label: “Available Time Slots”
   Input Type:
      desktop: horizontal button
      mobile:  dropdown of available slots
   Placeholder: “e.g. 2”
   Constraints: Required

5. Confirm button
   
   After click the Confirm button should show the booking result to customer make sure everything is correct


# Non-Functional requirements

1. Performance

   User can complete the reservation within 30 sec

2. Security

   Encrypted sensitive data
 

