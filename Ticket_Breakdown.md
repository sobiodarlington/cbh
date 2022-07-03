# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here



# Story
Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.

## Tasks 1
### Title 
Create `Facility_Agents` table to add facility custom agent ID

### Description
- Create `Facility_Agents` table 
- The table should contain `agent_id`, `faility_id`, and  `custom_agent_id`, `created_at` fields
- A composite key should be created for `agent_id`, `faility_id`, and  `custom_agent_id` to avoid duplicates


### Acceptance criteria
- `Facility_Agents` should exist in the database with (`agent_id`, `faility_id`, and  `custom_agent_id`, `created_at`, `updated_at`) fields
- Inserting a combination of same `agent_id`, `faility_id`, and  `custom_agent_id` should fail
  - `agent_id` must be same datatype as `Agents.id`
  - `faility_id` must be same datatype as `Facilities.id`
  - Second insert should fail
    1. INSERT 'agent-id-1', 'facility-id-1234', 'custom-facility-agent-id-1234'
    2. INSERT 'agent-id-1', 'facility-id-1234', 'custom-facility-agent-id-1234'

### Time estimate 
2hrs



## Tasks 2
### Title 
Implement a feature where facilities and create/update custom IDs for agents 

### Description
- Add a new endpoint `api/add-custom-id`
- The implementation logic should create a new custom ID for agent associated to Facility if none exists
- The implementation logic should update existing custom ID for agent associated to Facility if none exists
- Request schema
  - Method: `POST`
  - Authenticated: Yes
  - Body {
    agent_id: string
    custom_agent_id: string
  }
  - Success Response {
    status: 'successful'
  }
  - Error response {
    status: 'error'
    message: 'Reason for error'
  }

### Acceptance criteria
- When facility manager adds a custom ID for agent, the added custom ID should be visible in agent's profile
- The added custom ID be persistent in the database

### Time estimate
2 days


## Tasks 3
Update `getShiftsByFacility` function to return `custom_agent_id` as part of the shifts data

### Description
Update the query that gets shifts by faculty to do SQL JOIN with `Facility_Agents` table so that the return value for `getShiftsByFacility` include the facility agent custom ID 

### Acceptance criteria
If a custom ID exist for an agent, it must be included in the shift data for that agent returned by `getShiftsByFacility` 

### Time estimate
1 day



## Tasks 4
Update `generateReport` function to include `custom_agent_id` as part of the report data 

### Description
Update `generateReport` function to include `custom_agent_id` as part of the report data in the PDF


### Acceptance criteria
If a custom ID exist for an agent, it must be included the report PDF

### Time estimate
1 day
