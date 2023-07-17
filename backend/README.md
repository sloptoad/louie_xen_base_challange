# Xen Challenge Backend Service

This service has a few endpoints you develop and test your coding challenge.

## Prerequisites
The API application runs in a docker container. Install docker before following any other steps:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Getting Started

1. First build the docker container by running:
    ```sh
    docker compose build
    ```
2. Next, start the container:
    ```sh
    docker compose up
    ```

The container will run on port 3000 of your machine by default.
If you'd like to change this, simply edit the [docker-compose.yml](./docker-compose.yml) to expose a different port.
E.g. to change the API webservice to port 5555 on your machine:

From:

    ...
          dockerfile: Dockerfile
        ports:
          - "3000:3000"
    ...

To:

    ...
          dockerfile: Dockerfile
        ports:
          - "3000:5555"
    ...

Then simply re-run step 2 above to start the service on the new port


## Usage
The container has several available endpoints for you to query related to invoices.

### Endpoints
- List invoices:

    GET http://localhost:3000/invoices

    Example Output:
    ```json
        [
            {
                "id": 7,
                "invoice_number": "INV-001",
                "amount": "2689.0",
                "due_date": "2023-07-15",
                "created_at": "2023-07-05T20:44:51.631Z",
                "updated_at": "2023-07-05T20:44:51.631Z",
                "state": "created"
            },
            {
                "id": 8,
                "invoice_number": "INV-002",
                "amount": "9238.0",
                "due_date": "2023-08-05",
                "created_at": "2023-07-05T20:44:51.633Z",
                "updated_at": "2023-07-05T20:44:51.633Z",
                "state": "created"
            },
            {
                "id": 9,
                "invoice_number": "INV-003",
            ...etc
        ]
    ```

- Get an invoice:

    GET http://localhost:3000/invoices/7

    Example Response:
    ```json
    {
        "id": 7,
        "invoice_number": "INV-001",
        "amount": "2689.0",
        "due_date": "2023-07-15",
        "created_at": "2023-07-05T20:44:51.631Z",
        "updated_at": "2023-07-05T20:44:51.631Z",
        "state": "created"
    }
    ```

- Create an invoice:

    PUT http://localhost:3000/invoices

    BODY:
    ```json
    {
        "invoice_number": "INV-999",
        "amount": "2999.99",
        "due_date": "2023-07-15",
        "created_at": "2023-07-05T20:44:51.631Z",
        "updated_at": "2023-07-05T20:44:51.631Z",
        "state": "created"
    }
    ```

    Response:
    ```json
    {
       "id": 13,
       "invoice_number": "INV-999",
       "amount": "2999.99",
       "due_date": "2023-07-15",
       "created_at": "2023-07-05T21:54:32.422Z",
       "updated_at": "2023-07-05T21:54:32.422Z",
       "state": "created"
    }
    ```

- Update an invoice:

    PUT http://localhost:3000/invoices/13

    BODY:
    ```json
    {
        "invoice": {
            "amount": "2700.00"
        }
    }
    ```

    Response:
    ```json
    {
        "message": "Invoice successfully updated",
        "invoice": {
           "id": 13,
           "invoice_number": "INV-999",
           "amount": "2700.0",
           "due_date": "2023-07-15",
           "created_at": "2023-07-05T21:54:32.422Z",
           "updated_at": "2023-07-05T21:54:32.422Z",
           "state": "created"
        }
    }
    ```

- Pay an invoice:

    POST http://localhost:3000/invoices/13/pay

    Response:
    ```json
    {
        "message": "Invoice successfully paid",
        "invoice": {
            "state": "paid",
            "id": 13,
            "amount": "2999.99",
            "invoice_number": "INV-999",
            "due_date": "2023-07-15",
            "created_at": "2023-07-05T21:54:32.422Z",
            "updated_at": "2023-07-05T21:59:04.995Z"
        }
    }
    ```

- Ship an invoice:

    POST http://localhost:3000/invoices/13/ship

    Response:
    ```json
    {
        "message": "Invoice successfully shipped",
        "invoice": {
            "state": "shipped",
            "id": 13,
            "amount": "2999.99",
            "invoice_number": "INV-999",
            "due_date": "2023-07-15",
            "created_at": "2023-07-05T21:54:32.422Z",
            "updated_at": "2023-07-05T21:59:04.995Z"
        }
    }
    ```

- Complete an invoice:

    POST http://localhost:3000/invoices/13/ship

    Response:
    ```json
    {
        "message": "Invoice successfully completed",
        "invoice": {
            "state": "complete",
            "id": 13,
            "amount": "2999.99",
            "invoice_number": "INV-999",
            "due_date": "2023-07-15",
            "created_at": "2023-07-05T21:54:32.422Z",
            "updated_at": "2023-07-05T21:59:04.995Z"
        }
    }
    ```

- Void an invoice:

    POST http://localhost:3000/invoices/13/void

    Response:
    ```json
    {
        "message": "Invoice successfully voided",
        "invoice": {
            "state": "void",
            "id": 13,
            "amount": "2999.99",
            "invoice_number": "INV-999",
            "due_date": "2023-07-15",
            "created_at": "2023-07-05T21:54:32.422Z",
            "updated_at": "2023-07-05T21:59:04.995Z"
        }
    }
    ```
