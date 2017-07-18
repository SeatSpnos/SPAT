var chart_config = {
    chart: {
        container: "#ContactsH",
        rootOrientation:  'NORTH',
        siblingSeparation:   35,
        subTeeSeparation:    70,
        
        connectors: {
            type: 'step',
            style: {
                'stroke': '#bbb',
                'arrow-end': 'oval-wide-long'
            }

        },
        node: {
            HTMLclass: 'contactsH'
        }
    },
    nodeStructure: {
        text: {

            name: "Hugo Rodigues",
            title: "Gestor SP",
            desc : "Competências",
            contact: {

                val : 'Contactos',
                href : '#Drop1'
            },

        },

        HTMLid: "Gestor",
        collapsable: true,

        children: [
            {
                text:{

                    name: "Luís Gomes",
                    title: "Cordenador",
                    contact: {

                        val : '931048018',
                        href : 'mailto:luis.gomes@futurcabo.pt',
                        target: '_self'

                    },

                },
                collapsable: true,
                stackChildren: false,
                HTMLid: "Cordenador",
                children: [
                        {
                        
                            text:{

                                name: "João Carreira",
                                title: "Chefe Equipa",
                                contact: {

                                    val : '931048016',
                                    href : 'mailto:joao.carreira@futurcabo.pt',
                                    target: '_self'

                                },

                            },
                            collapsable: true,
                            collapsed : true,
                            stackChildren: false,
                            HTMLid: "ChefeEquipa",
                            children: [
                                    {
                                        text:{

                                            name: "Pedro Gaspar",
                                            title: "Análise Manutenções",
                                            contact: {

                                                val : '931043772',
                                                href : 'mailto:pedro.gaspar@futurcabo.pt',
                                                target: '_self'

                                            },

                                        },
                                        collapsed : true,
                                        stackChildren: false,
                                        HTMLid: "AnaliseManutencoes"
                                    },
                                    {
                                        text:{

                                            name: "Helena Rocha",
                                            title: "Recursos Humanos e Indicadores",
                                            contact: {

                                                val : '931048011',
                                                href : 'mailto:helena.rocha@futurcabo.pt',
                                                target: '_self'

                                            },

                                        },
                                        collapsed : true,
                                        stackChildren: false,
                                        HTMLid: "RH" 
                                    },
                                    {
                                        text:{

                                            name: "Miguel Cordeiro",
                                            title: "Gestor de SP interno da NOS",
                                            contact: {

                                                val : '931048082',
                                                href : 'mailto:miguel.cordeiro@futurcabo.pt',
                                                target: '_self'

                                            },

                                        },
                                        collapsed : true,
                                        stackChildren: false,
                                        HTMLid: "GestorSPNOS"

                                    }

                            ]
                    },
                    {
                             text:{

                                name: "Nuno Madeira",
                                title: "Chefe Equipa",
                                contact: {

                                    val : '931048019',
                                    href : 'mailto:nuno.madeira@futurcabo.pt',
                                    target: '_self'

                                },

                            },
                            collapsable: true,
                            collapsed : true,
                            stackChildren: false,
                            HTMLid: "ChefeEquipa2",
                            children : [
                                {
                                    text:{

                                        name: "Jorge pinto",
                                        title: "Responsável Sala",
                                        contact: {

                                            val : '931048006',
                                            href : 'mailto:jorge.pinto@futurcabo.pt',
                                            target: '_self'

                                        },

                                    },
                                    collapsable: true,
                                    collapsed : true,
                                    stackChildren: false,
                                    HTMLid: "ResponsavelSala",
                                    children: [

                                        {
                                            text:{

                                                name: "Numero Geral",
                                                title: "Contacto da Sala",
                                                contact: {

                                                    val : '214220086',
                                                    href : '#',
                                                    target: '_self'

                                                },

                                            },
                                            collapsed : true,
                                            stackChildren: false,
                                            HTMLid: "ContactoSala"
                                        },
                                        {

                                          text:{

                                            name: "Carlos Avô",
                                            title: "Contacto da Sala",
                                            contact: {

                                                val : '931048013',
                                                href : 'mailto:carlos.avo@futurcabo.pt',
                                                target: '_self'

                                            },

                                        },
                                        collapsed : true,
                                        stackChildren: false,
                                        HTMLid: "ContactoSala2"

                                        }

                                    ]

                                }

                            ]
                        }
                ]
            }
        ]
    }
};