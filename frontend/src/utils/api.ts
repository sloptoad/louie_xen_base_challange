// file for api requests, left in consoles for easy error handling
export const payInvoice = async (id: number) => {
    const url = `http://localhost:3000/invoices/${id}/pay`;
    const requestBody = {};
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        console.log(data.invoice);
    } catch (error) {
        console.error('Error:', error);
    }
};
export const completeInvoice = async (id: number) => {
    console.log({id})
    const url = `http://localhost:3000/invoices/${id}/complete`;
    const requestBody = {};
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        console.log(data.message);
        console.log(data.invoice);
    } catch (error) {
        console.error('Error:', error);
    }
};
export const shipInvoice = async (id: number) => {
    const url = `http://localhost:3000/invoices/${id}/ship`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        console.log(data.message);
        console.log(data.invoice);
    } catch (error) {
        console.error('Error:', error);
    }
};

export const updateInvoice = async (id:number, updatedAmount:number) => {
    const url = `http://localhost:3000/invoices/${id}`;
    
    const requestBody = {
      invoice: {
        amount: updatedAmount
      }
    };
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      const data = await response.json();
      console.log(data.message);
      console.log(data.invoice);
    } catch (error) {
      console.error('Error:', error);
    }
  };
