import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as ace from 'ace-builds';
import { NavbarComponent } from '../navbar/navbar.component';
import { AboutUsComponent } from '../aboutUs-page/aboutUs.component';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  imports: [NavbarComponent, AboutUsComponent],
  standalone: true,
})
export class CodeEditorComponent implements AfterViewInit {
  @ViewChild('editor') private editor!: ElementRef<HTMLElement>;
  private aceEditor: ace.Ace.Editor | undefined;

  // Language templates
  private templates: { [key: string]: string } = {
    javascript: `function example() {
  console.log("Hello, JavaScript!");
}`,
    python: `def example():
    print("Hello, Python!")
    
if __name__ == "__main__":
    example()`,
    java: `public class Example {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello, HTML!</title>
</head>
<body>
    <h1>Hello, HTML!</h1>
</body>
</html>`,
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}`,
    typescript: `function example(): void {
  console.log("Hello, TypeScript!");
}`,
    ruby: `def example
  puts "Hello, Ruby!"
end`,
    php: `<?php
echo "Hello, PHP!";
?>`,
    go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}`,
    swift: `import Foundation

print("Hello, Swift!")`,
    kotlin: `fun main() {
    println("Hello, Kotlin!")
}`,
  };

  // Language mode mappings for ACE
  private languageModes: { [key: string]: string } = {
    javascript: 'javascript',
    python: 'python',
    java: 'java',
    html: 'html',
    cpp: 'c_cpp',
    typescript: 'typescript',
    ruby: 'ruby',
    php: 'php',
    go: 'golang',
    swift: 'swift',
    kotlin: 'kotlin',
  };

  ngAfterViewInit(): void {
    ace.config.set(
      'basePath',
      'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
    );

    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.setTheme('ace/theme/twilight');
    this.aceEditor.session.setMode('ace/mode/c_cpp');
    this.aceEditor.setFontSize(14);

    this.setTemplate('cpp');

    this.aceEditor.on('change', () => {
      console.log(this.aceEditor?.getValue());
    });
  }

  changeTheme(event: Event): void {
    const theme = (event.target as HTMLSelectElement).value;
    this.aceEditor?.setTheme(`ace/theme/${theme}`);
  }

  changeLanguage(event: Event): void {
    const language = (event.target as HTMLSelectElement).value;
    const mode = this.languageModes[language] || 'text';
    this.aceEditor?.session.setMode(`ace/mode/${mode}`);
    this.setTemplate(language);
  }

  private setTemplate(language: string): void {
    const template = this.templates[language] || '';
    this.aceEditor?.session.setValue(template);
  }
}
