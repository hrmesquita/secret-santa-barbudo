export const validateAndSanitizeInput = {
    form(formData: { groupName: any; location: any; maxPrice: any; eventDate: any; participants: any; }, language: string) {
      const errors = [];
      
      // Sanitize and validate groupName (no special characters, required)
      const groupName = formData.groupName.trim();
      if (!groupName || /[<>/"']/.test(groupName)) {
        errors.push(language === 'en' ? 'Invalid group name' : 'Nome do grupo inválido');
      }
  
      // Sanitize and validate location (no special characters, required)
      const location = formData.location.trim();
      if (!location || /[<>/"']/.test(location)) {
        errors.push(language === 'en' ? 'Invalid location' : 'Localização inválida');
      }
  
      // Sanitize and validate maxPrice (positive number)
      const maxPrice = parseFloat(formData.maxPrice);
      if (isNaN(maxPrice) || maxPrice <= 0) {
        errors.push(language === 'en' ? 'Invalid gift price limit' : 'Limite de preço inválido');
      }
  
      // Validate eventDate (must be in the future)
      const eventDate = new Date(formData.eventDate);
      if (!(eventDate instanceof Date) || eventDate < new Date()) {
        errors.push(language === 'en' ? 'Invalid event date' : 'Data do evento inválida');
      }
  
      // Validate participants
      formData.participants.forEach((participant, idx) => {
        // Sanitize and validate participant name (required, no special characters)
        const name = participant.name.trim();
        if (!name || /[<>/"']/.test(name) || name.includes('=')) {
          errors.push(
            language === 'en'
              ? `Participant ${idx + 1} has an invalid name`
              : `Participante ${idx + 1} tem um nome inválido`
          );
        }
  
        // Validate participant email (basic email pattern)
        const email = participant.email.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          errors.push(
            language === 'en'
              ? `Participant ${idx + 1} has an invalid email`
              : `Participante ${idx + 1} tem um email inválido`
          );
        }
  
        // Sanitize exclusions (valid emails only)
        participant.excludedParticipants.forEach((excludedEmail) => {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(excludedEmail)) {
            errors.push(
              language === 'en'
                ? `Invalid exclusion email for participant ${idx + 1}`
                : `Email de exclusão inválido para participante ${idx + 1}`
            );
          }
        });
      });
  
      // Return validation result
      return {
        isValid: errors.length === 0,
        errors
      };
    }
  };
  