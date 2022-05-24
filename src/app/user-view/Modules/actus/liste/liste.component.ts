import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { NewsService } from 'src/app/back-office/services-backoffice/news.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';
import { PublicitesService } from 'src/app/user-view/services/publicites.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  constructor(private route: ActivatedRoute,private newsService:NewsService,private pubService:PublicitesService,private router: Router,private msg: NzMessageService,private dataProvider:ProviderService) { }
url?:string
latestNews:any
currentIndex?:number//position courante
totalData?:number//taille totale recue
nombre_par_pages:number=5
debut_position_affichee?:number
fin_position_affichee?:number
newsGaucheBasAffiches:any//ce qui est a l'ecran
newsGaucheBas:any//la liste totale
commentaires:any
liensdrapeaux?:string
lienspubs?:string
liensNews2022?:string
newsGaucheHaut:any
recherche?:string
newscategorie?:string
newscategories:any
size: NzSelectSizeType = 'default';
  ngOnInit(): void {
    this.liensdrapeaux=this.dataProvider.getLiensDrapeaux()
    this.liensNews2022=this.dataProvider.getLiensNews2022()
    this.lienspubs=this.dataProvider.getLiensPubs()
    this.pubService.getRandomBanniere_par_taille("300x250").subscribe(
      data => {
        console.log(data)
        if(data.image){
          this.url=this.lienspubs+data.image
        }
        
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation de la banniere")
        console.log("erreur survenue lors de la recuperation de la banniere");
      }
    );

    this.newsService.getLatestNews().subscribe(
      data => {
       this.latestNews=data
       console.log("latest news",data[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des derniers news droites")
        console.log("erreur survenue lors de la recuperation des derniers news droites");
      }
    );
    this.newsService.getAllNewsByDateDesc().subscribe(
      data => {
        this.totalData=data.length
       this.newsGaucheHaut=data.slice(0,1)
       this.newsGaucheBas=data.slice(1,this.totalData);
       this.newsGaucheBasAffiches=data.slice(1,this.nombre_par_pages);
       console.log("news gauche haut",this.newsGaucheHaut[0])
       console.log("news gauche bas",this.newsGaucheBas[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des derniers news gauche")
        console.log("erreur survenue lors de la recuperation des derniers news gauche");
      }
    );
    this.dataProvider.getAllNewsCategories().subscribe(
      data => {
       this.newscategories=data
       console.log("exemple de news categorie",data[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des prochains news categories")
        console.log("erreur survenue lors de la recuperation des prochains news categories");
      }
    );
    this.dataProvider.getLastCommentaires().subscribe(
      data => {
       this.commentaires=data
       console.log("exemple de commentaire",data[0])
      },
      err => {
        this.msg.error("erreur survenue lors de la recuperation des prochains commentaires")
        console.log("erreur survenue lors de la recuperation des prochains commentaires");
      }
    );
  }
  detailsGauche(id:number,position:number){
    console.log(position)
    let element=this.newsGaucheBasAffiches[position]
    if(element.newscategorie2?.intitule=="Videos" ||element.newscategorie2?.intitule=="Photos"||element.newscategorie2?.intitule=="Articles sponsorisés"){
      this.msg.error("pas implementé")
    }else{
     // console.log("intitule",element.newscategorie2?.intitule)
      this.router.navigate(['details/'+id],{relativeTo:this.route});
    }
    
  }
  
  resultatsEvenement(id:number){
    //this.router.navigate(['details/'+id],{relativeTo:this.route});
  }
getPages(){
  if(this.currentIndex){
    //console.log("index "+this.currentIndex+" taille "+this.nombre_par_pages)
    this.debut_position_affichee=this.nombre_par_pages*(this.currentIndex-1)
  }
  else{
    this.debut_position_affichee=0
  }
  this.fin_position_affichee=this.debut_position_affichee+this.nombre_par_pages
  this.newsGaucheBasAffiches=this.newsGaucheBas.slice(this.debut_position_affichee,this.fin_position_affichee)
  //console.log("De "+this.debut_position_affichee+" a "+this.fin_position_affichee)
}
search():number{
    let recherche=""
    let categorie=""
  if(this.recherche && this.newscategorie){
    this.msg.info("recherche avec catégorie et mot clé")
    recherche=this.recherche
    categorie=this.newscategorie
  }else if(!this.recherche && this.newscategorie){
    this.msg.info("recherche avec catégorie seule")
    recherche="any"
    categorie=this.newscategorie
  }else if(this.recherche && !this.newscategorie){
    this.msg.info("recherche avec  mot clé seul")
    recherche=this.recherche
    categorie="any"
  }else if(!this.recherche && !this.newscategorie){
    this.msg.error("parametres de recherche incomplets")
    return -1
  }
  this.newsService.getNewsByCategorieAndChapo(recherche,categorie).subscribe(
    data => {
      if(data.length!=0){
        this.newsGaucheBas=data
     this.newsGaucheBasAffiches=data.slice(1,this.nombre_par_pages);
     this.totalData=data.length
     console.log("resultat de recherche",data[0])
      }else{
        this.msg.error("Aucun resultat trouvé !")
      }
      
    },
    err => {
      this.msg.error("erreur survenue lors de la recherche")
      console.log("erreur survenue lors de la recherche");
    }
  );
  return 0

}
  
  
}
