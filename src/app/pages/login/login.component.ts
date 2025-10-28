import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {AngularMaterialModule} from '../../shared/material/angular-material.module';
import {Router, RouterModule} from '@angular/router';
import {AuthenticationService} from '../../core/services/firebase/authentication.service';
import {User} from '@angular/fire/auth';
import {Subscription} from 'rxjs';
import {FormsModule, NgForm} from '@angular/forms';
import {EmailPromptComponent} from './email-prompt-component/email.prompt.component';
import {FullLoginFormComponent} from './full-login-form-component/full.login.form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AngularMaterialModule, RouterModule, EmailPromptComponent, FullLoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  hide = signal(true);
  loading = signal(false);
  authenticationSubs?: Subscription;

  private authenticationService = inject(AuthenticationService);
  private router = inject(Router)
  public showFullForm = signal(false);
  public emailSent = signal('');
  public resetState = () => this.emailSent.set('');

  ngOnInit(): void {
    this.authenticationSubs = this.authenticationService.authenticationState.subscribe((user: User | null) => {
      this.loading.set(false);
      if (this.router.url.includes('login?apiKey=')) {
        this.loading.set(true);
        this.authenticationService.loginWithEmailLink();
      }

      if (user) {
        this.router.navigate(['/']);
      }
    });
  }

  loginWithGoogle = async () => {
    try {
      this.loading.set(true);
      await this.authenticationService.loginWithGoogle();
      this.loading.set(false);
    } catch (exception) {
      this.loading.set(false);
      // location.reload();
      console.log(exception);
    }
  }

  emailFormSubmit(form: NgForm) {
    const email = form.value.email;
    const actionCodeSettings = {
      url: `${location.origin}${this.router.url}`,
      handleCodeInApp: true
    }
    this.authenticationService.sendAuthLink(email, actionCodeSettings);
    localStorage.setItem('emailForSignIn', email);
    this.emailSent.set(email);
    form.reset();
  }

  ngOnDestroy(): void {
    this.authenticationSubs?.unsubscribe();
  }
}
