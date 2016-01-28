#API Endpoints

note: 'id' always refers to whatever directly follows 'api' in the url
      ex. in /api/users/:id/projects, 'id' refers to a user id
      ex. in /api/projects/:id/notes, 'id' refers to a project id

*** /api/users ***

   GET - / - Retrieves all users info as JSON object, excluding their password.  
    
    {
      users: [
        {
          id:
          first:
          last:
          email:
          admin: 
        },
        ... 
      ]
    }
  
    POST - /signup - Sends new user info as JSON object; instantiates new user instance, logs-in user
    
    {
        {
          first:
          last:
          email:
          admin:
          adminCode:   
        },
    }

    POST - /signin - Sends user info as JSON object; initiates verification & creates new session if user is verified.  Otherwise, redirects user to sign-up view.
    
    {
      email:
      password:
    }

*** /api/users/:id - requires authentication- can only view :id path that corresponds to logged-in user ***

   GET - / - Retrieves all user info other than password.  A single user instance has the following fields:
    
      {
        id: Unique id for a user.
        first: User's first name.
        last: User's last name.
        email: User's email address
        admin: true/false
      }

   PUT - / - Updates user's data; sends JSON objet with all fields, including those with values that are unchanged.
    
    {
      first:
      last:
      email:
      admin:
    }

    DELETE - /:id - Deletes a user from DB


*** /api/properties *** - requires authentication (admin)

   GET - / - Retrieves all properties
    
    {
      properties: [
        {
          id:
          name:
          address:
          contacts:
          description:
        },
        ...
      ]
    }

    GET - /:id - Retrives an individual propertie 

      {
        id:
        name:
        address:
        contacts:
        description:
      }

    POST - / - Sends Propertie info as JSON object; Creates the propertie in the DB, and returns it

       {
        id:
        name:
        address:
        contacts:
        description:
      }

    PUT - /:id - Changes a propertie in the an specific propertie

      {
        id: 
        name:
        address:
        contacts:
        description:
      }

    DELETE - /:id - Deletes a propertie from DB

*** /api/jobs *** requires authentication (admin)


   GET - / - Retrieves all jobs
    
    {
      jobs: [
        {
          id:
          propertie:
          unit:
          description:
          worker:
          date_assigned:
          date_completed:
          status: 'requested','assigned','review','completed','invoiced' 
          invoice:
          po:
          notes:
        },
        ...
      ]
    }


    POST - / - Sends a job info as JSON object; Creates the propertie in the DB, and returns it with id

       {
          propertie:
          unit:
          description:
          worker:
          date_assigned:
          date_completed:
          status: 'requested','assigned','review','completed','invoiced' 
          invoice:
          po:
          notes:
      }

    PUT - /:id - Changes a job propertie 

      {
          propertie:
          unit:
          description:
          worker:
          date_assigned:
          date_completed:
          status: 'requested','assigned','review','completed','invoiced' 
          invoice:
          po:
          notes:
      }

*** /api/workers *** - To be implemented not as part of MVC
