import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-geminibot',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './geminibot.component.html',
  styleUrls: ['./geminibot.component.css']
})
export class GeminibotComponent {
  private geminiKey: string = 'AIzaSyC6OTnqrVONRR2PXSa5xPj_lwa-Dg2q2pw';
  userInput: string = '';
  chatHistory: Array<{ sender: string; text: string }> = [];

  @ViewChild('chatContainerRef') chatContainerRef: ElementRef | null = null;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    const savedHistory = localStorage.getItem('chatHistory');
    this.chatHistory = savedHistory ? JSON.parse(savedHistory) : [];
  }

  ngOnInit() {
    localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
    this.scrollToBottom();
  }

  formatMessage(text: string): string {
    const messageText = typeof text === 'string' ? text : '';
    
    // Replace newlines with <br> for line breaks
    let formattedText = messageText.replace(/\n/g, '<br>');
    
    // Bold formatting for text between "**"
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // List items starting with a digit (for numbered lists)
    formattedText = formattedText.replace(/(\d\.\s)/g, '<br>&nbsp;&nbsp;$1');
    
    // List items starting with a hyphen or asterisk
    formattedText = formattedText.replace(/(\*\s|\-\s)/g, '<br>&nbsp;&nbsp;&bull; ');
  
    return formattedText;
  }

  async getResponse() {
    if (!this.userInput) return;
  
    const userMessage = { sender: "User", text: this.userInput };
    this.chatHistory.push(userMessage);
    const userInput = this.userInput;  // Store user input for the prompt
    this.userInput = '';
  
    try {
      const res: any = await this.http.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.geminiKey}`,
        {
          contents: [
            {
              parts: [
                { text: "Previous Responses: " + this.chatHistory.map(msg => msg.text).join("\n") + "\nUser Query: " + userInput }
              ]
            }
          ]
        },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      ).toPromise();
  
      // Extracting the bot response text
      const botResponse = res?.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (botResponse) {
        const botMessage = { sender: "Gemini AI", text: botResponse };
        this.chatHistory.push(botMessage);
      } else {
        this.toastr.error('Failed to fetch a response from Gemini AI.');
      }
    } catch (error) {
      console.error('Error:', error);
      this.toastr.error('An error occurred while fetching the response.');
    } finally {
      localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
      this.scrollToBottom();
    }
  }
  

  handleClearChat() {
    this.chatHistory = [];
    localStorage.removeItem('chatHistory');
  }

  scrollToBottom() {
    if (this.chatContainerRef?.nativeElement) {
      this.chatContainerRef.nativeElement.scrollTop = this.chatContainerRef.nativeElement.scrollHeight;
    }
  }

  
}
