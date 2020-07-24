import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image} from '@react-pdf/renderer';
import arial from "../../fonts/Arial.ttf";
import timesNewRomanBold from "../../fonts/TimesNewRomanBold.ttf"
import timesNewRoman from "../../fonts/TimesNewRoman.ttf"
Font.register({ family: 'Arial', format: "truetype", src: arial });
Font.register({ family: 'TimesNewRoman', format: "truetype", src: timesNewRomanBold, fontWeight: 'bold' });
Font.register({ family: 'TimesNewRoman', format: "truetype", src: timesNewRoman, fontWeight: 'normal' });
const TABLE1_COL1_WIDTH = 140;
const TABLE1_COL2_WIDTH = 298;
const TABLE1_COL3_WIDTH = 313;
const TABLE2_COL1_WIDTH = 26;
const TABLE2_COL2_WIDTH = 114;
const TABLE2_COL3_WIDTH = 200;
const TABLE2_COL3N_WIDTH = TABLE2_COL3_WIDTH/3;
const TABLE2_COL4_WIDTH = 30;
const TABLE2_COL5_WIDTH = 68;
const TABLE2_COL6_WIDTH = 58;
const TABLE2_COL7_WIDTH = 58;
const TABLE2_COL8_WIDTH = 197;
const TABLE2_COL8_1_WIDTH = 70;
const TABLE2_COL8_2_WIDTH = 127;
const TABLE3_COL1_WIDTH = 245;
const TABLE3_COL2_WIDTH = 93;
const TABLE3_COL3_WIDTH = 216;
const TABLE3_COL4_WIDTH = 197;
const styles = StyleSheet.create({
    page: {
        paddingTop: 45,
        paddingLeft: 42,
        paddingRight: 48,
        fontSize: 6.7,
        fontFamily: 'Arial',
    },
    topPartContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: "row",
    },
    topPartTitle: {
        fontWeight: "bold",
        fontFamily: 'TimesNewRoman',
        textTransform: 'uppercase',
        fontSize: 9.4,
        marginBottom: 2,
    },
    topPartBlock: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
    },
    topPartUnderline: {
        paddingLeft: 8,
        paddingRight: 8,
        borderBottom: "1 solid black",
        marginBottom: 2
    },
    topPartSignatureContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: "row",
    },
    topPartSignature: {
        width: 123
    },
    topPartName: {
        width: 103
    },
    mainTitle: {
      marginBottom: 18,
    },
    mainTitleText: {
        textAlign: "center",
        fontSize: 10.7,
        fontFamily: 'TimesNewRoman',
        fontWeight: "bold",
        textTransform: 'uppercase',
        marginBottom: 10
    },
    mainTitleValid: {
        textAlign: "center",
    },
    title: {
        fontSize: 8,
        fontFamily: 'TimesNewRoman',
        fontWeight: "bold",
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        // margin: "auto",
        flexDirection: "row"
    },
    tableCol: {
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        justifyContent: 'center',
    },
    tableHeaderCol: {
        backgroundColor: '#eeece1',
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        justifyContent: 'center',
    },
    column: {
        height: 70,
    },
    columnItem: {
        height: '50%'
    },
    tableCell: {
        // margin: "auto",
        marginTop: 3,
        marginBottom: 3,
        display: 'block',
        textAlign: 'center',
    },
    tableCellMargin: {
        marginTop: 8,
        marginBottom: 8,
    },
    startOfLine: {
        textAlign: 'left',
        marginLeft: 2,
    },
    timesNewRoman: {
        fontFamily: 'TimesNewRoman',
    },
    table1: {
        marginBottom: 8,
    },
    table1Col1: {
        width: TABLE1_COL1_WIDTH,
    },
    table1Col2: {
        width: TABLE1_COL2_WIDTH,
    },
    table1Col3: {
        width: TABLE1_COL3_WIDTH,
    },
    table2Col1: {
        width: TABLE2_COL1_WIDTH,
    },
    table2Col2: {
        width: TABLE2_COL2_WIDTH,
    },
    table2Col3: {
        width: TABLE2_COL3_WIDTH,
    },
    table2Col3n: {
        width: TABLE2_COL3N_WIDTH,
    },
    table2Col4: {
        width: TABLE2_COL4_WIDTH,
    },
    table2Col5: {
        width: TABLE2_COL5_WIDTH,
    },
    table2Col6: {
        width: TABLE2_COL6_WIDTH,
    },
    table2Col7: {
        width: TABLE2_COL7_WIDTH,
    },
    table2Col8: {
        width: TABLE2_COL8_WIDTH,
    },
    table2Col81: {
        width: TABLE2_COL8_1_WIDTH,
    },
    table2Col82: {
        width: TABLE2_COL8_2_WIDTH,
    },
    table2Col14: {
        width: TABLE2_COL1_WIDTH + TABLE2_COL2_WIDTH + TABLE2_COL3_WIDTH + TABLE2_COL4_WIDTH,
    },
    table2Col56: {
        width: TABLE2_COL5_WIDTH + TABLE2_COL6_WIDTH +1
    },
    table3Col1: {
        width: TABLE3_COL1_WIDTH,
    },
    table3Col2: {
        width: TABLE3_COL2_WIDTH,
    },
    table3Col3: {
        width: TABLE3_COL3_WIDTH,
    },
    table3Col4: {
        width: TABLE3_COL4_WIDTH,
    },
    table3Title: {
        marginLeft: 27,
    },

});

const OpdCard = ({records, validFrom, validUntil, firstName, lastName, patronymic, position, signature}) => {
    const data = signature ? Buffer.from(signature.data) : null;

    return (
        <Document>
            <Page size="A4" orientation="landscape" style={styles.page}>
                <View style={styles.topPartContainer}>
                    <View>
                        <Text style={styles.topPartTitle}>Утверждаю</Text>
                        <View style={styles.topPartBlock}>
                            <Text style={styles.topPartUnderline}>Заместитель директора по продуктам Multi-D, по архитектуре и разработке</Text>
                            <Text>(должность)</Text>
                        </View>
                        <View style={styles.topPartSignatureContainer}>
                            <View style={styles.topPartBlock}>
                                <Text style={[styles.topPartUnderline, styles.topPartSignature]}> </Text>
                                <Text>(подпись)</Text>
                            </View>
                            <View style={styles.topPartBlock}>
                                <Text style={[styles.topPartUnderline, styles.topPartName]}>Моисеев М.Ю.</Text>
                                <Text>(Ф.И.О.)</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.mainTitle}>
                    <Text style={styles.mainTitleText}>Карта опд</Text>
                    <Text style={[styles.mainTitleValid, styles.title]}>период действия с {validFrom} по {validUntil}</Text>
                </View>
                <View style={[styles.table, styles.table1]}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableHeaderCol, styles.table1Col1]}>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.table1Col2]}>
                            <Text style={[styles.tableCell, styles.title]}>Ф.И.О., должность / структурное подразделение</Text>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.table1Col3]}>
                            <Text style={[styles.tableCell, styles.title]}>Наименование организации</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, styles.table1Col1]}>
                            <Text style={[styles.tableCell, styles.startOfLine, styles.title]}>Владелец карты ОПД</Text>
                        </View>
                        <View style={[styles.tableCol, styles.table1Col2]}>
                            <Text style={[styles.tableCell, styles.startOfLine]}>
                                {`${lastName} ${firstName} ${patronymic}, ${position}\n`}
                                Управление разработки продуктов Multi-D
                            </Text>
                        </View>
                        <View style={[styles.tableCol, styles.table1Col3]}>
                            <Text style={[styles.tableCell, styles.timesNewRoman, {fontSize: 8}]}>АО ИК "АСЭ"</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.table, styles.table2]}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableHeaderCol, styles.table2Col1]}>
                            <Text style={[styles.tableCell, styles.title]}>№ ОПД п/п</Text>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.table2Col2]}>
                            <Text style={[styles.tableCell, styles.title]}>Наименование ОПД, единица
                                измерения ОПД</Text>
                        </View>
                        <View style={[styles.column, styles.table2Col3]}>
                            <View style={[styles.tableHeaderCol, styles.columnItem, styles.table2Col3]}>
                                <Text style={[styles.tableCell, styles.title]}>Уровни выполнения ОПД</Text>
                            </View>
                            <View style={[styles.tableRow, styles.columnItem]}>
                                <View style={[styles.tableHeaderCol, styles.table2Col3n]}>
                                    <Text style={[styles.tableCell, styles.title]}>Нижний уровень</Text>
                                </View>
                                <View style={[styles.tableHeaderCol, styles.table2Col3n]}>
                                    <Text style={[styles.tableCell, styles.title]}>Целевое значение</Text>
                                </View>
                                <View style={[styles.tableHeaderCol, styles.table2Col3n]}>
                                    <Text style={[styles.tableCell, styles.title]}>Верхний уровень</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.tableHeaderCol, styles.table2Col4]}>
                            <Text style={[styles.tableCell, styles.title]}>Вес ОПД, %</Text>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.table2Col5]}>
                            <Text style={[styles.tableCell, styles.title]}>Тип ОПД (непрерывный, дискретный, понижающий, отсекающий)</Text>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.table2Col6]}>
                            <Text style={[styles.tableCell, styles.title]}>Фактический уровень выполнения ОПД</Text>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.table2Col7]}>
                            <Text style={[styles.tableCell, styles.title]}>Взвешенный коэффициент выполнения ОПД</Text>
                        </View>
                        <View style={[styles.column, styles.table2Col8]}>
                            <View style={[styles.tableHeaderCol, styles.columnItem, styles.table2Col8]}>
                                <Text style={[styles.tableCell, styles.title]}>Подписи при оценке выполнения ОПД (инициатор ОПД подтверждает уровень выполнения ОПД по каждому ОПД)</Text>
                            </View>
                            <View style={[styles.tableRow, styles.columnItem]}>
                                <View style={[styles.tableHeaderCol, styles.table2Col81]}>
                                    <Text style={[styles.tableCell, styles.title]}>Подпись</Text>
                                </View>
                                <View style={[styles.tableHeaderCol, styles.table2Col82]}>
                                    <Text style={[styles.tableCell, styles.title]}>Ф.И.О., должность</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View>
                            {
                                records && records.map((record, index) =>
                                <View style={styles.tableRow}>
                                    <View style={[styles.tableCol, styles.table2Col1]}>
                                        <Text style={styles.tableCell}>{index+1}</Text>
                                    </View>
                                    <View style={[styles.tableCol, styles.table2Col2]}>
                                        <Text style={[styles.tableCell, styles.tableCellMargin, styles.startOfLine]}>
                                            {record.title}
                                        </Text>
                                    </View>
                                    <View style={[styles.tableCol, styles.table2Col3n]}>

                                    </View>
                                    <View style={[styles.tableCol, styles.table2Col3n]}>
                                        <Text style={styles.tableCell}>
                                            {record.date}
                                        </Text>
                                    </View>
                                    <View style={[styles.tableCol, styles.table2Col3n]}>

                                    </View>
                                    <View style={[styles.tableCol, styles.table2Col4]}>
                                        <Text style={styles.tableCell}>
                                            {record.percent}%
                                        </Text>
                                    </View>
                                    <View style={[styles.tableCol, styles.table2Col5]}>
                                        <Text style={styles.tableCell}>
                                            дискретный
                                        </Text>
                                    </View>
                                    <View style={[styles.tableCol, styles.table2Col6]}>
                                        <Text style={styles.tableCell}>
                                            100%
                                        </Text>
                                    </View>
                                    <View style={[styles.tableCol, styles.table2Col7]}>
                                        <Text style={styles.tableCell}>
                                            {record.percent}%
                                        </Text>
                                    </View>
                                </View>)
                            }

                            <View style={styles.tableRow}>
                                <View style={[styles.tableCol, styles.table2Col1]}>
                                    <Text style={styles.tableCell}>{records.length+1}</Text>
                                </View>
                                <View style={[styles.tableCol, styles.table2Col2]}>
                                    <Text style={[styles.tableCell, styles.tableCellMargin, styles.startOfLine]}>
                                        Выполнение поручений руководства, %
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, styles.table2Col3n]}>
                                    <Text style={styles.tableCell}>
                                        90%
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, styles.table2Col3n]}>
                                    <Text style={styles.tableCell}>
                                        100%
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, styles.table2Col3n]}>

                                </View>
                                <View style={[styles.tableCol, styles.table2Col4]}>
                                    <Text style={styles.tableCell}>
                                        20%
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, styles.table2Col5]}>
                                    <Text style={styles.tableCell}>
                                        непрерывный
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, styles.table2Col6]}>
                                    <Text style={styles.tableCell}>
                                        100%
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, styles.table2Col7]}>
                                    <Text style={styles.tableCell}>
                                        20%
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.tableRow}>
                                <View style={[styles.tableCol, styles.table2Col1]}>
                                    <Text style={styles.tableCell}>{records.length+2}</Text>
                                </View>
                                <View style={[styles.tableCol, styles.table2Col2]}>
                                    <Text style={[styles.tableCell, styles.tableCellMargin, styles.startOfLine]}>
                                        Оценка руководителя
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, styles.table2Col3n]}>
                                    <Text style={styles.tableCell}>
                                        частично
                                        соответствует
                                        ожиданиям
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, styles.table2Col3n]}>
                                    <Text style={styles.tableCell}>
                                        соответствует
                                        ожиданиям
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, styles.table2Col3n]}>

                                </View>
                                <View style={[styles.tableCol, styles.table2Col4]}>
                                    <Text style={styles.tableCell}>
                                        20%
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, styles.table2Col5]}>
                                    <Text style={styles.tableCell}>
                                        Понижающий
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, styles.table2Col6]}>
                                    <Text style={styles.tableCell}>
                                        соответствует ожиданиям
                                    </Text>
                                </View>
                                <View style={[styles.tableCol, styles.table2Col7]}>
                                    <Text style={styles.tableCell}>
                                        -
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.tableCol, styles.table2Col81]}>

                        </View>
                        <View style={[styles.tableCol, styles.table2Col82]}>
                            <Text style={[styles.tableCell, styles.timesNewRoman]}>
                                Моисеев Михаил Юрьевич,{'\n'}
                                Заместитель директора по продуктам Multi-D, по архитектуре и разработке
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.table2Col14}></View>
                    <View style={[styles.tableHeaderCol, styles.table2Col56, {borderLeft: '1 solid black'}]}>
                        <Text style={[styles.tableCell, styles.title, styles.startOfLine]}>
                            Итоговый коэффициент выполнения ОПД
                        </Text>
                    </View>
                    <View style={[styles.tableCol, styles.table2Col7]}>
                        <Text style={[styles.tableCell, {fontSize: 8}]}>
                            100%
                        </Text>
                    </View>
                </View>
                <Text style={[styles.title, styles.table3Title]}>
                    Подписи согласования при разработке карт ОПД
                </Text>
                <View style={[styles.table]}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableHeaderCol, styles.table3Col1]}>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.table3Col2]}>
                            <Text style={[styles.tableCell, styles.title]}>Подпись</Text>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.table3Col3]}>
                            <Text style={[styles.tableCell, styles.title]}>Ф.И.О., должность</Text>
                        </View>
                        <View style={[styles.tableHeaderCol, styles.table3Col4]}>
                            <Text style={[styles.tableCell, styles.title]}>Наименование организации</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, styles.table3Col1]}>
                            <Text style={[styles.tableCell, styles.startOfLine, styles.title, {marginTop: 5, marginBottom: 5}]}>Владелец карты ОПД</Text>
                        </View>
                        <View style={[styles.tableCol, styles.table3Col2]}>
                            {
                                data &&
                                <Image
                                    src={data.toString('utf8')}
                                />
                            }
                        </View>
                        <View style={[styles.tableCol, styles.table3Col3]}>
                            <Text style={[styles.tableCell, styles.startOfLine, styles.timesNewRoman]}>{`${lastName} ${firstName} ${patronymic}, ${position}\n`}</Text>
                        </View>
                        <View style={[styles.tableCol, styles.table3Col4]}>
                            <Text style={[styles.tableCell, styles.timesNewRoman]}>АО ИК "АСЭ"</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, styles.table3Col1]}>
                            <Text style={[styles.tableCell, styles.startOfLine, styles.title, {marginTop: 5, marginBottom: 5}]}>Оперативный руководитель</Text>
                        </View>
                        <View style={[styles.tableCol, styles.table3Col2]}>

                        </View>
                        <View style={[styles.tableCol, styles.table3Col3]}>
                            <Text style={[styles.tableCell, styles.startOfLine, styles.timesNewRoman]}>Моисеев Михаил Юрьевич, заместитель директора</Text>
                        </View>
                        <View style={[styles.tableCol, styles.table3Col4]}>
                            <Text style={[styles.tableCell, styles.timesNewRoman]}>АО ИК "АСЭ"</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCol, styles.table3Col1]}>
                            <Text style={[styles.tableCell, styles.startOfLine, styles.title, {marginTop: 5, marginBottom: 5}]}>Функциональный руководитель</Text>
                        </View>
                        <View style={[styles.tableCol, styles.table3Col2]}>

                        </View>
                        <View style={[styles.tableCol, styles.table3Col3]}>
                            <Text style={[styles.tableCell, styles.startOfLine, styles.timesNewRoman]}>Педора Сергей Александрович, главный эксперт</Text>
                        </View>
                        <View style={[styles.tableCol, styles.table3Col4]}>
                            <Text style={[styles.tableCell, styles.timesNewRoman]}>АО ИК "АСЭ"</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};
export default OpdCard