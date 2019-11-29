import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private statusBar: StatusBar,
  ) {
    // let status bar overlay webview
this.statusBar.overlaysWebView(true);


    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
    });
  }

  ngOnInit() {}

  async loginUser(loginForm): Promise<void> {
    const loading = await this.loadingCtrl.create();
    try {
      loading.present();

      const email: string = loginForm.value.email;
      const password: string = loginForm.value.password;
      await this.authService.loginUser(email, password);
      await loading.dismiss();
      this.router.navigateByUrl('/tabs');
    } catch (error) {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        message: error.message,
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
          },
        ],
      });
      alert.present();
    }
  }
}

