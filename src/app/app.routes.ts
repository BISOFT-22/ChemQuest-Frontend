import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { SigUpComponent } from './pages/auth/sign-up/signup.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GuestGuard } from './guards/guest.guard';
import { IRoleType } from './interfaces';
import { ProfileComponent } from './pages/profile/profile.component';
import { GamesComponent } from './pages/games/games.component';
import { ChemGuess7Component } from './components/ChemGuess/chem-guess7/chem-guess7.component';
import { ChemGuess8Component } from './components/ChemGuess/chem-guess8/chem-guess8.component';
import { ChemGuess9Component } from './components/ChemGuess/chem-guess9/chem-guess9.component';
import { ChemGuess10Component } from './components/ChemGuess/chem-guess10/chem-guess10.component';
import { ChemGuess11Component } from './components/ChemGuess/chem-guess11/chem-guess11.component';
import { ChemCrossComponent } from './components/ChemCross/chem-cross/chem-cross.component';
import { LandingChemquestComponent } from './pages/landing-chemquest/landing-chemquest.component'; // Importa tu componente de landing page
import { LandingNakamuraComponent } from './pages/landing-nakamura/landing-nakamura.component';
import { ChemcraftComponent } from './pages/chemcraft/chemcraft.component';
import { ChemTestCreateComponent } from './pages/TestCreation/testCreation.component';
import { ChemguessComponent } from './pages/chemguess/chemguess.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingChemquestComponent, 
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'signup',
    component: SigUpComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
  },

  {
    path: 'landing-nakamura',
    component: LandingNakamuraComponent, 
    pathMatch: 'full',
  },
  {
    path: 'chem-craft',
    component: ChemcraftComponent,

  },

  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          showInSidebar: false,
          name: 'Profile'
        }
      },
      {
        path: 'chemGuess8',
        component: ChemGuess8Component,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          showInSidebar: false,
          name: 'chemGuess8'
        }
        
      },
      {
        path: 'chemGuess7',
        component: ChemGuess7Component,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          showInSidebar: false,
          name: 'chemGuess7'
        }
        
      },
      {
        path: 'test-creation',
        component: ChemTestCreateComponent,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
          ],
          showInSidebar: true,
          name: 'Creación de Examen'
        }
      },
      {
        path: 'chemcraft',
        component: ChemcraftComponent,
        title:'ChemCraft',
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          showInSidebar: false,
          name: 'ChemCraft'
        }
      },
      {
        path: 'chemguess',
        component: ChemguessComponent,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          showInSidebar: false,
          name: 'ChemGuess'
        }
      },
      {
        path: 'games',
        component: GamesComponent,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          showInSidebar: true,
          name: 'Juegos'
        }
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate:[AdminRoleGuard],
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin
          ],
          showInSidebar: true,
          name: 'Usuarios'
        }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          showInSidebar: true,
          name: 'Dashboard'
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          showInSidebar: false,
          name: 'profile'
        }
      },
      {
        path: 'chemGuess9',
        component: ChemGuess9Component,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          showInSidebar: true,
          name: 'chemGuess9'
        }
        
      },
      {
        path: 'chemGuess10',
        component: ChemGuess10Component,
        data: { 
          authorities: [
            IRoleType.admin, 
            IRoleType.superAdmin,
            IRoleType.user
          ],
          showInSidebar: false,
          name: 'chemGuess10'
        }
        
      },
      {
        path: 'chemGuess11',
        component: ChemGuess11Component,
        data: {
          authorities: [
            IRoleType.admin,
            IRoleType.superAdmin,
            IRoleType.user
          ],
          showInSidebar: false,
          name: 'chemGuess11'
        }
      },
        {
          path: 'chemcross',
          component: ChemCrossComponent,
          title:'ChemCross',
          data: { 
            authorities: [
              IRoleType.admin, 
              IRoleType.superAdmin,
              IRoleType.user
            ],
            showInSidebar: false,
            name: 'ChemCross'
          } 
      },
      
    ],
  },
];
