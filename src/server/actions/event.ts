const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const EventService = {
    Register: async () => {
        const registrationData = {
            "id": 0,
            "eventAssignmentId": 2008,
            "bankTransactionId": "",
            "paymentVendorId": 0
          };
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${API_URL}/Event/CreateParticipant`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
               
                body: JSON.stringify(registrationData),
            });

            if (!response.ok) {
                const errorData = await response.json(); 
                 //console.error( errorData.message); 
                 return { isSuccessful: false, message: errorData.message }; 
            }

            const data = await response.json(); 
            if (data.messsage==="Registration Successful") {
               
                 return { isSuccessful: true, message: data.message }; 
            }

            

        } catch (error) {
            console.error(error);
            return { isSuccessful: false, message: 'An unexpected error occurred.' }; 
        }
    }
}

export default EventService