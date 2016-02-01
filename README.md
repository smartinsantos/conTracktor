#API Endpoints

note: 'id' always refers to whatever directly follows '/' in the url
      ex. in /users/:id/projects, 'id' refers to a user id

*** /admin ***
  
    POST - /create - Sends new user info as JSON object; instantiates new user instance, logs-in user
    
    {
        {
          first:
          last:
          email:
          password:
          token: // this token will allow to create admin accounts
        },
    }

    POST - /signin - Sends user info as JSON object; initiates verification & creates new session if user is verified.  Otherwise, redirects user to sign-up view.
    
    {
      email:
      password:
    }

*** /admin/:id - requires authentication- can only view :id path that corresponds to logged-in user ***

   GET - / - Retrieves all admins info other than password.  A single user instance has the following fields:
    
      {
        id: Unique id for a user.
        first: User's first name.
        last: User's last name.
        email: User's email address
      }

   PUT - / - Updates user's data; sends JSON objet with all fields, including those with values that are unchanged.
    
    {
      first:
      last:
      email:
      password:
    }

    DELETE - /:id - Deletes a user from DB


*** /properties *** - requires authentication (admin)

   GET - / - Retrieves all properties
    
    {
      properties: [
        {
          id:
          name:
          address:
          contacts: Note we need another table for contact/phone number
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

*** /jobs *** requires authentication (admin)


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
          status: 'requested','assigned','reviewed','completed','invoiced' 
          po:
          price: 
          invoice:
          notes:
          quote: 
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
          price:
          po:
          notes: Note we need another table for a list of notes
          quote:
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
          price:
          po:
          notes:
          quote:
      }

*** /workers *** - 

  GET - / - Retrieves all workers
    
    {
      workers: [
        {
          id:
          first:
          last:
          phone:
          address:
        },
        ...
      ]
    }

    GET - /:id - Retrives an individual worker

      {
        id:
        first:
        last:
        phone:
        address:
      }

    POST - / - Sends worker info as JSON object; Creates the propertie in the DB, and returns it

       {
        id:
        first:
        last:
        phone:
        address:
      }

    PUT - /:id - Changes a worker in the an specific propertie

      {
        id:
        first:
        last:
        phone:
        address:
      }

    DELETE - /:id - Deletes a propertie from DB

    POST - /signin - Sends user info as JSON object; initiates verification & creates new session if user is verified.  Otherwise, redirects user to sign-up view.
    
    {
      email:
      password:
    }
