import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ReviewsComponent } from './reviews.component';

describe('ReviewsComponent', () => {
  let component: ReviewsComponent;
  let fixture: ComponentFixture<ReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsComponent, FormsModule], // Include FormsModule for ngModel
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch reviews on init', () => {
    // After fetching, reviews should have at least one item
    expect(component.reviews.length).toBeGreaterThan(0);
  });

  it('should submit a new review', () => {
    component.newReview = { author: 'Test User', content: 'This is a test review.' };
    component.submitReview();
    
    // Check if the review was added
    expect(component.reviews.length).toBeGreaterThan(0);
    expect(component.reviews[0].author).toBe('Test User');
    expect(component.reviews[0].content).toBe('This is a test review.');
  });

  it('should submit a new question', () => {
    // First, create a review to attach a question to
    component.newReview = { author: 'Test User', content: 'This is a test review.' };
    component.submitReview();

    // Set up the new question
    component.newQuestion = { author: 'Question User', content: 'What is graph traversal?' };
    component.submitQuestion(component.reviews[0].id);

    // Check if the question was added to the review
    expect(component.reviews[0].questions.length).toBe(1);
    expect(component.reviews[0].questions[0].author).toBe('Question User');
    expect(component.reviews[0].questions[0].content).toBe('What is graph traversal?');
  });

  it('should submit a reply to a question', () => {
    // Create a review and a question first
    component.newReview = { author: 'Test User', content: 'This is a test review.' };
    component.submitReview();
    component.newQuestion = { author: 'Question User', content: 'What is graph traversal?' };
    component.submitQuestion(component.reviews[0].id);

    // Now, set up the new reply
    component.newReply = { author: 'Reply User', content: 'Graph traversal is a method.' };
    component.submitReply(component.reviews[0].id, component.reviews[0].questions[0].id);

    // Check if the reply was added to the question
    expect(component.reviews[0].questions[0].replies.length).toBe(1);
    expect(component.reviews[0].questions[0].replies[0].author).toBe('Reply User');
    expect(component.reviews[0].questions[0].replies[0].content).toBe('Graph traversal is a method.');
  });

  it('should handle file selection for a question', () => {
    const file = new File([''], 'test-image.png', { type: 'image/png' });
    const event = { target: { files: [file] } } as unknown as Event; // Cast to Event

    component.onFileSelected(event);

    // Check if the file is set correctly
    expect(component.newQuestion.file).toBe(file);
  });

  it('should generate an image URL for the selected file', () => {
    const file = new File([''], 'test-image.png', { type: 'image/png' });
    const imageUrl = component.getImageUrl(file);

    // Check if the URL is created
    expect(imageUrl).toContain('blob:'); // Blob URLs start with 'blob:'
  });
});
