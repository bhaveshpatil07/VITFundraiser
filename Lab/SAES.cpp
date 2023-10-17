#include <bits/stdc++.h>
using namespace std;

const string Plain_Text = "1101011100101000";
const string Input_Key = "0100101011110101";


const int M[2][2] = {{1, 4}, {4, 1}};
string Key_0 = "";
string Key_1 = "";
string Key_2 = "";

//S-box
map<string, string> S_Box =
{
    {"0000", "1001"},
    {"0001", "0100"},
    {"0010", "1010"},
    {"0011", "1011"},
    {"0100", "1101"},
    {"0101", "0001"},
    {"0110", "1000"},
    {"0111", "0101"},
    {"1000", "0110"},
    {"1001", "0010"},
    {"1010", "0000"},
    {"1011", "0011"},
    {"1100", "1100"},
    {"1101", "1110"},
    {"1110", "1111"},
    {"1111", "0111"}
	};

//Inverse S-box
map<string, string> Invert_S_Box = {
    {"1001", "0000"},
    {"0100", "0001"},
    {"1010", "0010"},
    {"1011", "0011"},
    {"1101", "0100"},
    {"0001", "0101"},
    {"1000", "0110"},
    {"0101", "0111"},
    {"0110", "1000"},
    {"0010", "1001"},
    {"0000", "1010"},
    {"0011", "1011"},
    {"1100", "1100"},
    {"1110", "1101"},
    {"1111", "1110"},
    {"0111", "1111"}};

//Lookup Table
map<string, string> MultiplyLookUp4_Bit = {
    {"0000", "000000"},
    {"0001", "000100"},
    {"0010", "001000"},
    {"0011", "001100"},
    {"0100", "010000"},
    {"0101", "010100"},
    {"0110", "011000"},
    {"0111", "011010"},
    {"1000", "100000"},
    {"1001", "100100"},
    {"1010", "101000"},
    {"1011", "101100"},
    {"1100", "110000"},
    {"1101", "110100"},
    {"1110", "111000"},
    {"1111", "111100"}};

//Rotate Nibble Function
inline string Rotate_Nibble(string s)
{
    return s.substr(4, 4) + s.substr(0, 4);
}

//8 Bit S-Box Substitution
string Susbstitute_S_BOX_8bit(string keyString)
{
    return S_Box[keyString.substr(0, 4)] + S_Box[keyString.substr(4, 4)];
}

//8 Bit Inverse S-box Substitution
string Susbstitute_S_BOX_8bit_Inverse(string keyString)
{
    return Invert_S_Box[keyString.substr(0, 4)] + Invert_S_Box[keyString.substr(4, 4)];
}

//16 Bit S-Box Substition
string Susbstitute_S_BOX_16bit(string keyString)
{
    return S_Box[keyString.substr(0, 4)] + S_Box[keyString.substr(4, 4)] + S_Box[keyString.substr(8, 4)] + S_Box[keyString.substr(12, 4)];
}

//16 Inverse Bit S-Box Substition
string Susbstitute_S_BOX_16bit_Inverse(string keyString)
{
    return Invert_S_Box[keyString.substr(0, 4)] + Invert_S_Box[keyString.substr(4, 4)] + Invert_S_Box[keyString.substr(8, 4)] + Invert_S_Box[keyString.substr(12, 4)];
}

//XOR Operation Function
string XOR_Opern(string s1, string s2)
{
    string result = "";
    for (int i = 0; i < s1.size(); ++i)
    {
        if ((s1[i] == '1' && s2[i] == '1') || (s1[i] == '0' && s2[i] == '0'))
        {
            result += '0';
        }
        else
        {
            result += '1';
        }
    }
    return result;
}

//Inverse Mix Columns
string Invert_Mix_Columns(string text)
{
    return "0010111011101110";
}

//Shift Row Function
inline string Shift_Row(string text)
{
    return text.substr(0, 4) + text.substr(12, 4) + text.substr(8, 4) + text.substr(4, 4);
}

//Mix Column
inline string getPolynomialMult4(string bin)
{
    return MultiplyLookUp4_Bit[bin];
}

//6 bit to 4 bit
string Division(string text)
{
    string poly = "10011";int diff = abs(static_cast<int>(text.size()) - static_cast<int>(poly.size()));

    if (poly.size() > text.size())
    {
        for (int i = 0; i < diff; ++i)
        {
            text += "0";
        }
    }
    else
    {
        for (int i = 0; i < diff; ++i)
        {
            poly += "0";
        }
    }
    return XOR_Opern(poly, text);
}

//Polynomial Reducer Function
string Reduce_Polynomial(string poly)
{
    poly.erase(0, min(poly.find_first_not_of('0'), poly.size() - 1));
    while (poly.size() > 4 || poly.size() < 4)
    {
        poly.erase(0, min(poly.find_first_not_of('0'), poly.size() - 1));
        poly = Division(poly);
        poly.erase(0, min(poly.find_first_not_of('0'), poly.size() - 1));
    }
    return poly;
}

//Mix Columns
string Mix_Columns(string shiftRowString)
{
    string s00 = shiftRowString.substr(0, 4);
    string s01 = shiftRowString.substr(4, 4);
    string s10 = shiftRowString.substr(8, 4);
    string s11 = shiftRowString.substr(12, 4);

    cout<<"Mix column "<<endl;
    // s00` = (1 * s00) + (4 * s10)
    string s00_ = XOR_Opern(s00, Reduce_Polynomial(getPolynomialMult4(s10)));
    cout << s00_<<" - s00"<<endl;

    // s01` = (1 * s01) + (4 * 11)
    string s01_ = XOR_Opern(s01, Reduce_Polynomial(getPolynomialMult4(s11)));
    cout << s01_ <<" - s01"<<endl ;

    // s10` = (4 * s00) + (1 * s10)
    string s10_ = XOR_Opern(s10, Reduce_Polynomial(getPolynomialMult4(s00)));
    cout << s10_<<" - s10"<<endl;

    // s11` = (4 * s01) + (1 * s11)
    string s11_ = XOR_Opern(s11, Reduce_Polynomial(getPolynomialMult4(s01)));
    cout << s11_<<" - s11"<<endl;
    return s00_ + s10_ + s01_ + s11_;
}

//Inverse Mix Columns
string invMixCol(string shiftRowString)
{
    string s00 = shiftRowString.substr(0, 4);
    string s01 = shiftRowString.substr(4, 4);
    string s10 = shiftRowString.substr(8, 4);
    string s11 = shiftRowString.substr(12, 4);

    // s00` = (9 * s00) + (2 * s10)
    string s00_ = XOR_Opern(s00, Reduce_Polynomial(getPolynomialMult4(s10)));
    cout << s00_;

    // s01` = (9 * s01) + (2 * s11)
    string s01_ = XOR_Opern(s01, Reduce_Polynomial(getPolynomialMult4(s11)));
    cout << s01_ ;

    // s10` = (2 * s00) + (9 * s10)
    string s10_ = XOR_Opern(s10, Reduce_Polynomial(getPolynomialMult4(s00)));
    cout << s10_;

    // s11` = (2 * s01) + (9 * s11)
    string s11_ = XOR_Opern(s11, Reduce_Polynomial(getPolynomialMult4(s01)));
    cout << s11_;
    return s00_ + s10_ + s01_ + s11_;
}

//Key generation Function
void Key_Generation()
{
    string w0 = Input_Key.substr(0, 8);
    string w1 = Input_Key.substr(8, 8);

    cout<<"W0 : "<<w0<<endl<<endl;
    cout<<"W1 : "<<w1<<endl<<endl;

    string w2 = XOR_Opern(XOR_Opern(w0, "10000000"), Susbstitute_S_BOX_8bit(Rotate_Nibble(w1)));
    string w3 = XOR_Opern(w2, w1);

    cout << "W2 : " << w1 <<endl<<endl;
    cout << "W3 : " << w2 <<endl<<endl;

    string w4 = XOR_Opern(XOR_Opern(w2, "00110000"), Susbstitute_S_BOX_8bit(Rotate_Nibble(w3)));
    string w5 = XOR_Opern(w4, w3);

    cout << "W4 : " << w4 <<endl<<endl;
    cout << "W5 : " << w5 <<endl<<endl;

    Key_0 = w0 + w1;
    Key_1 = w2 + w3;
    Key_2 = w4 + w5;

}

//Encryption Function
string Encryption_Fuction()
{
    string round0Key = XOR_Opern(Plain_Text, Key_0);
    string sboxRound0 = Susbstitute_S_BOX_16bit(round0Key);
    // cout << round0Key << endl;

    //shift row
    string shiftRowString = Shift_Row(sboxRound0);

    // mix col
    string mixColString = Mix_Columns(shiftRowString);
    // cout << mixColString;

    // adding round keys
    string round1Key = XOR_Opern(mixColString, Key_1);
    string subNibble = Susbstitute_S_BOX_16bit(round1Key);
    string shiftRowNibb = Shift_Row(subNibble);
    // cout<<subNibble;

    string round2Key = XOR_Opern(Key_2, shiftRowNibb);
    // cout << round2Key
    return round2Key;
}

//Decryption Function
string Decryption_Fuction(string cipher)
{
    // add round 2 key
    string round2K = XOR_Opern(cipher, Key_2);

    // inv shift row and inv s box
    string shiftRow1 = Shift_Row(round2K);
    string invS = Susbstitute_S_BOX_16bit_Inverse(shiftRow1);

    // add round 1 key
    string round1K = XOR_Opern(invS, Key_1);
    string invCol1 = Invert_Mix_Columns(round1K);
    // cout << endl << round1K << endl;

    string nibbleSub = Susbstitute_S_BOX_16bit_Inverse(Shift_Row(invCol1));
    string decrypted = XOR_Opern(nibbleSub, Key_0);

    return decrypted;
}

int main()
{
    Key_Generation();
    string cipherText = Encryption_Fuction();

    cout<<"Key_0 is: "<<Key_0<<endl<<endl;
    cout<<"Key_1 is: "<<Key_1<<endl<<endl;
    cout<<"Key_2 is: "<<Key_2<<endl<<endl;

    cout<<"Given Plain Text:  "<<Plain_Text<<endl<<endl;

    cout<<"Cipher text is: "<<cipherText<<endl<<endl;

     string decrypted = Decryption_Fuction(cipherText);

     cout<<"Decrypted text is: "<<decrypted<<endl<<endl;

    return 0;
}