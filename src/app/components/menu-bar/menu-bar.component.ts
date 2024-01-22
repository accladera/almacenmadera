import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/services/auth.service";
import {SpinnerService} from "../../spinner/spinner.service";
import {AuthenticationResponse} from "../../auth/interface/authentication-response";
import {map, Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements  OnInit{
  navbarOpen = false;
  usuarioId = '';
    menuItems = [
      { icon: 'store', title: 'Gestión de productos', link: '/productos' },
      { icon: 'construction', title: 'Gestión de materiales', link: '/materiales' },
      { icon: 'archive', title: 'Gestión de insumos', link: '/insumos' },
      { icon: 'business', title: 'Gestión de sucursales', link: '/sucursales' },
      { icon: 'warehouse', title: 'Gestión de almacenes', link: '/almacenes' },
      { icon: 'people', title: 'Gestión de empleados', link: '/empleados' },
      { icon: 'assessment', title: 'Gestión de inventarios', link: '/inventarios' },
      { icon: 'notifications', title: 'Notificaciones', link: '/notificaciones' },
      { icon: 'build', title: 'Configuraciones', link: '/configuraciones' },

    ];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );





  constructor(
    private router: Router,
    private authService: AuthService,
    private spinner: SpinnerService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.onInitGetUser();

  }

  ngOnInit(): void {
    this.navbarOpen = false;
    this.onInitGetUser();

  }
 onInitGetUser(){
    const id = (localStorage.getItem('userId'));
    if(id){
      this.usuarioId = localStorage.getItem('userId')!;
    }
  }
  onLogout(){
    this.spinner.show();
    this.usuarioId='';
    this.authService.logout();
    this.router.navigateByUrl('/');
    this.spinner.hide();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
