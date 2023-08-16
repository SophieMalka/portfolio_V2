import './about.css';
import Nav from '../../components/nav/nav';
import Item from '../../components/item/item';

function About() {
    return(
        <section id='about'>
            <Nav />
            <div className='about-me'>
                <h2>A propos de moi</h2>
                <p>Passionnée depuis toujours par le développement web, mon objectif est simple : donner vie à des idées à travers le code. Chaque projet est pour moi une opportunité d'innover, de repousser les limites et de créer des interfaces fonctionnelles et esthétiques. Mon portfolio illustre ma vision et mes compétences en tant que développeuse web. </p>
            </div>
            <div className='career'>
                <div className='work-experience'>
                    <h2>Expériences professionnelles</h2>
                    <Item
                        title={'Développeuse web'}
                        contract={'Indépendant'}
                        business={'Sophie Malka'}
                        location={'Nice'}
                        date={'Actuel'}
                        infos={<ul>
                            <li>Conception de sites web</li>
                            <li>Amélioration des performances web</li>
                        </ul>}
                    />
                    <Item 
                        title={'Gestion e-commerce Prestashop'}
                        contract={'CDI'}
                        business={'Abel Franklin'}
                        location={'Nice'}
                        date={'2017 - 2023'}
                        infos={<ul>
                            <li>Migration vers PrestaShop 1.7</li>
                            <li>Refonte intégrale</li>
                            <li>Amélioration des performances web</li>
                            <li>Maintenance générale</li>
                            <li>Création des fiches produits</li>
                        </ul>}
                    />
                </div>
                <div className='education'>
                    <h2>Formations</h2>
                    <Item
                        title={'Développeur web et web mobile'}
                        contract={'BAC +2'}
                        business={'OpenClassRooms'}
                        location={'Nice'}
                        date={'2022 - 2023'}
                        infos={<ul>
                            <li>Implémenter une interface responsive conformément à une maquette</li>
                            <li>Organiser la gestion d'un projet avec une méthode agile</li>
                            <li>Optimiser les performances et débugger un site web</li>
                            <li>Récupérer les données utilisateurs via des formulaires</li>
                            <li>Manipuler les éléments du DOM et gérer les évènements utilisateurs</li>
                            <li>Initialiser et développer une application ReactJS</li>
                            <li>Développement back-end avec NodeJS et ExpressJS</li>
                            <li>Gestion de bases de données SQLite et l'ORM Sequelize</li>
                        </ul>}
                    />
                </div>
            </div>
        </section>
    )
};

export default About;