import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import * as ace from "ace-builds";
import { NavbarComponent } from "../navbar/navbar.component";
import { AboutUsComponent } from "../aboutUs-page/aboutUs.component";


@Component({
  selector: "app-code-editor",
  templateUrl: "./code-editor.component.html",
  styleUrls: ["./code-editor.component.css"],
  imports: [NavbarComponent, AboutUsComponent],
  standalone: true,
})
export class CodeEditorComponent implements AfterViewInit {

  @ViewChild("editor") private editor!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    // Set base path to load themes and modes from the CDN
    ace.config.set("basePath", "https://unpkg.com/ace-builds@1.4.12/src-noconflict");
    
    // Initialize the ACE editor
    const aceEditor = ace.edit(this.editor.nativeElement);
    
    // Set initial configuration
    ace.config.set("fontSize", "14px");
    aceEditor.setTheme('ace/theme/twilight');
    aceEditor.session.setMode('ace/mode/javascript');
    
    // Set initial content for the editor
    aceEditor.session.setValue(`function foo(items) {
      var i;
      for (i = 0; i < items.length; i++) {
        alert("Ace Rocks " + items[i]);
      }
    }`);

    // Log changes to the editor's value
    aceEditor.on("change", () => {
      console.log(aceEditor.getValue());
    });
  }
}
