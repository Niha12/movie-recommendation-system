import React, {Component} from "react";
import {auth} from "../services/firebase";
import firebase from "firebase";
import moment from "moment";
import CanvasJSReact from '../assets/canvasjs.react';
import Header from "../components/header";
import Footer from "../components/footer";
let CanvasJS = CanvasJSReact.CanvasJS;

export default class RatingCharts extends Component {
    constructor() {
        super();
        this.state = {
            uuid: auth().currentUser.uid,
            optionsRatingsPerDay: {
                title: {},
                axisX: {},
                axisY: {},
                data: []
            },
            optionsRatingsFrequency: {
                title: {},
                axisX: {},
                axisY: {},
                data: []
            },
            optionsRatingsReleaseYear: {
                title: {},
                axisX: {},
                axisY: {},
                data: []
            },
            optionsRatingsGenres: {
                title: {},
                axisX: {},
                axisY: {},
                data: []
            }
        }

        this.docRef = firebase.firestore().collection("Users")
            .doc(this.state.uuid).collection("Ratings")

    }

    async ratingsPerDay() {
        let dictOfYears = {}
        await this.docRef.get().then(snapshot => {
            snapshot.forEach(doc => {
                let date = doc.data().date
                if (date in dictOfYears) {
                    dictOfYears[date] = dictOfYears[date] + 1
                } else {
                    dictOfYears[date] = 1
                }
            })
        })

        let ordDict = {}
        Object.keys(dictOfYears).sort(function (a, b) {
            return moment(b, 'YYYY-MM-DD').toDate() - moment(a, 'YYYY-MM-DD').toDate();
        }).forEach(function (key) {
            ordDict[key] = dictOfYears[key];
        })

        let dataPoints = []
        for (let i in ordDict) {
            let date =  new Date(i.substring(0, 4), i.substring(5, 7) - 1, i.substring(8))
            dataPoints.push({x:date, y: ordDict[i]})
        }

        let optionsLocal = {
            animationEnabled: true,
            title: {
                text: "Your ratings per day"
            },
            axisY: {
                title: "Number of Ratings"
            },
            axisX: {
                title: "Day of Year",
                valueFormatString: "DD-MM",
            },
            data: [{
                type: "line",
                toolTipContent: "Date {x}: {y} Ratings",
                dataPoints: dataPoints
            }]
        }

        await this.setState({optionsRatingsPerDay: optionsLocal})
    }

    async ratingsFrequency() {
        let numof5 = 0
        let numof4 = 0
        let numof3 = 0
        let numof2 = 0
        let numof1 = 0
        await this.docRef.get().then(snapshot => {
            snapshot.forEach(doc => {
                if (doc.data().rating === 5) {
                    numof5 = numof5 + 1
                } else if (doc.data().rating === 4) {
                    numof4 = numof4 + 1
                } else if (doc.data().rating === 3) {
                    numof3 = numof3 + 1
                } else if (doc.data().rating === 2) {
                    numof2 = numof2 + 1
                } else if (doc.data().rating === 1) {
                    numof1 = numof1 + 1
                }
            })
        })

        let optionsLocal = {
            title: {
                text: "Distribution of your ratings"
            },
            axisX: {
                title: "Rating"
            },
            axisY: {
                title: "Frequency",
                interval: 1
            },
            data: [
                {
                    type: "column",
                    dataPoints: [
                        {label: "1", y: numof1},
                        {label: "2", y: numof2},
                        {label: "3", y: numof3},
                        {label: "4", y: numof4},
                        {label: "5", y: numof5}
                    ]
                }
            ]
        }
        await this.setState({optionsRatingsFrequency: optionsLocal})
    }

    async ratingsGenres() {
        let dictOfGenres = {}
        await this.docRef.get().then(snapshot => {
            snapshot.forEach(doc => {
                let genres = doc.data().genres
                for (let i in genres){
                    let genre = genres[i]
                    if (genre in dictOfGenres) {
                        dictOfGenres[genre] = dictOfGenres[genre] + 1
                    } else {
                        dictOfGenres[genre] = 1
                    }
                }
            })
        })
        let dataPoints = []
        let total = 0
        for (let i in dictOfGenres) {
            total = total + dictOfGenres[i]
        }

        for (let i in dictOfGenres) {
            dataPoints.push({label: i, y: dictOfGenres[i]/total})
        }


        let optionsLocal = {
            title: {
                text: "Distribution of your ratings with genres"
            },
            data: [
                {
                    type: "pie",
                    indexLabel: "#percent%",
                    dataPoints: dataPoints

                }
            ]
        }
        await this.setState({optionsRatingsGenres: optionsLocal})
    }

    async ratingsReleaseYear(){
        let dictOfYears = {}
        await this.docRef.get().then(snapshot => {
            snapshot.forEach(doc => {
                let releaseYear = doc.data().release.substring(0, 4)
                if (releaseYear in dictOfYears) {
                    dictOfYears[releaseYear] = dictOfYears[releaseYear] + 1
                } else {
                    dictOfYears[releaseYear] = 1
                }
            })
        })

        let dataPoints = []
        for (let i in dictOfYears) {
            dataPoints.push({label: i, y: dictOfYears[i]})
        }


        let optionsLocal = {
            title: {
                text: "Distribution of your ratings with release years"
            },
            axisY: {
                title: "Number of Ratings"
            },
            axisX: {
                title: "Release Year",
                valueFormatString: "YYYY"
            },
            data: [
                {
                    type: "column",
                    dataPoints: dataPoints

                }
            ]
        }
        await this.setState({optionsRatingsReleaseYear: optionsLocal})
    }

    async componentDidMount() {

        await this.ratingsPerDay()
        await this.ratingsFrequency()
        await this.ratingsReleaseYear()
        await this.ratingsGenres()

        let chart = new CanvasJS.Chart("chartContainer1", this.state.optionsRatingsReleaseYear);
        chart.render();

        let chart1 = new CanvasJS.Chart("chartContainer2", this.state.optionsRatingsFrequency);
        chart1.render();

        let chart2 = new CanvasJS.Chart("chartContainer3", this.state.optionsRatingsPerDay);
        chart2.render();

        let chart3 = new CanvasJS.Chart("chartContainer4", this.state.optionsRatingsGenres);
        chart3.render();

    }












    render(){
        return(
            <div>
                <Header/>
                <h1 className="heading"> Your rating data</h1>
                <div id="chartContainer1" style={{width: "45%",height: "300px",display: "inline-block", float:"left"}}/>
                <div id="chartContainer2" style={{width: "45%",height: "300px",display: "inline-block", float:"right"}}/><br/>
                <div id="chartContainer4" style={{width: "50%",height: "300px",display: "inline-block", float:"left"}}/><br/>
                <div id="chartContainer3" style={{width: "100%",height: "300px",display: "inline-block"}}/>
                <Footer/>
            </div>
        )
    }
}
