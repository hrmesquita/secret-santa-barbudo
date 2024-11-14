import React, { useState } from 'react';
import { validateAndSanitizeInput } from '@/utils/validation';
import { Plus, Trash2, Send, AlertCircle, CalendarIcon, MapPin, Gift, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const MAX_PARTICIPANTS = 30;

function MobileLayout() {
    const [groupName, setGroupName] = useState('');
    const [location, setLocation] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [eventDate, setEventDate] = useState();
    const [language, setLanguage] = useState('en');
    const [participants, setParticipants] = useState([
      { name: '', email: '', excludedParticipants: new Set(), showExclusions: false },
      { name: '', email: '', excludedParticipants: new Set(), showExclusions: false },
    ]);
    const [error, setError] = useState('');
  
    
  
    const formatDate = (date: string | number | Date) => {
      if (!date) return '';
      return new Date(date).toLocaleDateString(language === 'en' ? 'en-US' : 'pt-PT', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };
  
    const addParticipant = () => {
      if (participants.length > 30) {
        setError(language === 'en'
          ? 'Maximum 30 participants allowed'
          : 'Máximo de 30 participantes permitido'
        );
        return;
      }
      setError('');
      setParticipants([
        ...participants,
        {
          name: '',
          email: '',
          excludedParticipants: new Set<string>(),
          showExclusions: false
        }
      ]);
    };
  
    const removeParticipant = (index: number) => {
      if (participants.length <= 2) {
        setError(language === 'en' ? 'You need at least 2 participants' : 'Precisas de pelo menos 2 participantes');
        return;
      }
      setError('');
      const newParticipants = participants.filter((_, i) => i !== index);
      setParticipants(newParticipants);
    };
  
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      setError('');
  
      const formData = {
        groupName,
        location,
        maxPrice,
        eventDate,
        participants
      };
  
      if (!groupName.trim()) {
        setError(language === 'en' ? 'Group name is required' : 'Nome do grupo necessário');
        return;
      }
  
      if (!location.trim()) {
        setError(language === 'en' ? 'Location is required' : 'Localização necessária');
        return;
      }
  
      if (!maxPrice || Number(maxPrice) <= 0) {
        setError(language === 'en' ? 'Please enter a valid price' : 'Por favor introduza um valor válido');
        return;
      }
  
      if (!eventDate) {
        setError(language === 'en' ? 'Event date is required' : 'Data do evento necessária');
        return;
      }
  
      const invalidParticipants = participants.filter(
        p => !p.name.trim() || !p.email.trim()
      );
  
      if (invalidParticipants.length > 0) {
        setError(language === 'en' ? 'All participants fields required' : 'Todos os campos de participantes necessários');
        return;
      }
  
      const validation = validateAndSanitizeInput.form(formData, language);
  
      if (!validation.isValid) {
        setError(validation.errors.join('. '));
        return;
      }
  
      console.log('Sanitized and Validated Data:', formData);
  
      alert(language === 'en' ? 'Data submitted successfully!' : 'Dados enviados com sucesso!');
    };
  
    const updateParticipant = (index: number, field: any, value: any) => {
      setParticipants(participants.map((participant, i) => {
        if (i === index) {
          return { ...participant, [field]: value };
        }
        return participant;
      }));
    };
  
    const addExclusion = (participantIndex: number, excludedEmail: string) => {
      if (!excludedEmail || participantIndex === undefined) return;
      
      setParticipants(participants.map((participant, index) => {
        if (index === participantIndex) {
          return {
            ...participant,
            excludedParticipants: new Set([
              ...(participant.excludedParticipants || new Set()),
              excludedEmail
            ])
          };
        }
        return participant;
      }));
    };
  
    const removeExclusion = (participantIndex: number, excludedEmail: string) => {
      if (!excludedEmail || participantIndex === undefined) return;
    
      setParticipants(participants.map((participant, index) => {
        if (index === participantIndex) {
          const newExclusions = new Set(participant.excludedParticipants || new Set());
          newExclusions.delete(excludedEmail);
          return {
            ...participant,
            excludedParticipants: newExclusions
          };
        }
        return participant;
      }));
    };
  
    const getAvailableExclusions = (currentIndex: number | undefined) => {
      if (currentIndex === undefined) return [];
      const currentParticipant = participants[currentIndex];
  
      return participants.filter((p, idx) =>
        idx !== currentIndex &&
        p.email &&
        !currentParticipant.excludedParticipants.has(p.email)
      );
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <div className="mb-4">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[110px]">
            <SelectValue>
              {language === 'en' ? 'English' : 'Português'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="pt">Português</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <img 
        src="https://i.ibb.co/M73LTM7/Remove-bg-ai-1731604328101.png"
        alt="Secret Santa Logo"
        width={200}
        height={200}
        className="mx-auto mb-6"
      />

      <Card className="shadow-lg mb-6">
        <CardContent className="p-4 space-y-4 text-center">
            <h3 className="text-xl font-semibold">
                {language === 'en' ? 'What is Secret Santa?' : 'O que é o Amigo Secreto?'}
            </h3>
            <p className="text-sm text-gray-600">
                {language === 'en' 
                    ? 'Secret Santa is a Christmas tradition where a group of people are randomly assigned to give a gift to another person in the group, while keeping their identity secret until the gift exchange.'
                    : 'O Amigo Secreto é uma tradição natalícia onde um grupo de pessoas é designado aleatoriamente para dar uma prenda a outra pessoa do grupo, mantendo a sua identidade em segredo até à troca de prendas.'}
            </p>
            <h3 className="text-xl font-semibold">
                {language === 'en' ? 'How does it work?' : 'Como funciona?'}
            </h3>
            <ol className="text-sm text-gray-600 text-left list-decimal pl-6 space-y-2">
                {language === 'en' ? (
                    <>
                        <li>Enter your group name, location, gift price limit, and event date;</li>
                        <li>Add all participants with their names and emails;</li>
                        <li>Use the exclusion toggle if certain people shouldn't be matched;</li>
                        <li>Click "Santa Shuffle" to generate random assignments;</li>
                        <li>Each participant will receive their match by email.</li>
                    </>
                ) : (
                    <>
                        <li>Insere o nome do grupo, localização, limite de preço da prenda e data do evento;</li>
                        <li>Adiciona todos os participantes, inserindo os seus nomes e emails;</li>
                        <li>Usa a opção de exclusão se certas pessoas não devem ser sorteadas juntas;</li>
                        <li>Clique em "Santa Shuffle" para gerar o sorteio aleatório;</li>
                        <li>Cada participante receberá o seu sorteio por email.</li>
                    </>
                )}
            </ol>
            <h2 className="font-bold text-red-600">
                {language === 'en' ? 'Merry Christmas! 🎄' : 'Feliz Natal! 🎄'}
            </h2>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">
              {language === 'en' ? 'Create Secret Santa Group' : 'Criar Grupo do Amigo Secreto'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Event Details */}
            <div className="space-y-2">
              <Label htmlFor="groupName">
                {language === 'en' ? 'Group Name' : 'Nome do Grupo'}
              </Label>
              <Input
                id="groupName"
                placeholder={language === 'en' ? 'Enter group name' : 'Insere o nome do grupo'}
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">
                {language === 'en' ? 'Location' : 'Localização'}
              </Label>
              <div className="relative">
                <MapPin className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="location"
                  className="pl-8"
                  placeholder={language === 'en' ? 'Enter event location' : 'Insere a localização'}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxPrice">
                {language === 'en' ? 'Gift Price Limit' : 'Limite de Preço'}
              </Label>
              <div className="relative">
                <Gift className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="maxPrice"
                  type="number"
                  className="pl-8"
                  placeholder={language === 'en' ? 'Enter maximum price' : 'Insere o preço máximo'}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>
                {language === 'en' ? 'Event Date' : 'Data do Evento'}
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {eventDate ? formatDate(eventDate) : language === 'en' ? 'Pick a date' : 'Escolhe uma data'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={eventDate}
                    onSelect={setEventDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    required
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Participants Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {language === 'en' ? 'Participants' : 'Participantes'} ({participants.length}/{MAX_PARTICIPANTS})
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addParticipant}
                  disabled={participants.length >= MAX_PARTICIPANTS}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Add' : 'Adicionar'}
                </Button>
              </div>

              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                {participants.map((participant, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 space-y-4">
                          <Input
                            placeholder={language === 'en' ? 'Enter name' : 'Insere o nome'}
                            value={participant.name}
                            onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                            required
                          />
                          <Input
                            type="email"
                            placeholder={language === 'en' ? 'Enter email' : 'Insere o email'}
                            value={participant.email}
                            onChange={(e) => updateParticipant(index, 'email', e.target.value)}
                            required
                          />
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={participant.showExclusions}
                              onCheckedChange={(checked) => {
                                const newParticipants = [...participants];
                                newParticipants[index].showExclusions = checked;
                                setParticipants(newParticipants);
                              }}
                            />
                            <Label>
                              {language === 'en' ? 'Exclusions' : 'Exclusões'}
                            </Label>
                          </div>
                          {participant.showExclusions && (
                            <Select
                              onValueChange={(value) => addExclusion(index, value)}
                              disabled={getAvailableExclusions(index).length === 0}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={
                                  language === 'en'
                                    ? 'Select to exclude'
                                    : 'Seleciona para excluir'
                                } />
                              </SelectTrigger>
                              <SelectContent>
                                {getAvailableExclusions(index).map((p) => (
                                  <SelectItem key={p.email} value={p.email}>
                                    {p.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeParticipant(index)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full">
              <Send className="w-4 h-4 mr-2" />
              {'Santa Shuffle'}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <div className="mt-6 text-center">
        <a href="https://www.buymeacoffee.com/hrainhamesquita">
          <Button type="button" variant="outline" size="sm">
            🍕 Buy me a slice of pizza
          </Button>
        </a>
      </div>
    </div>
    )
}

export default MobileLayout;