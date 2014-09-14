Game.ColorWheel = function (game) {

    // use RYB
    // primary1 = R
    // primary2 = Y
    // primary3 = B
    this.colorPoints = {
        'primary1_particle': 100,
        'primary2_particle': 10,
        'primary3_particle': 1
    };
    
    // black
    this.BLACK  = 0;

    // primary
    this.PRIMARY_RED    = 1;
    this.PRIMARY_YELLOW = 2;
    this.PRIMARY_BLUE   = 3;

    // secondary
    this.SECONDARY_GREEN    = 4;
    this.SECONDARY_VIOLET   = 5;
    this.SECONDARY_ORANGE   = 6;

    // tertiary
    this.TERTIARY_YELLOW_GREEN  = 7;
    this.TERTIARY_BLUE_GREEN    = 8;
    this.TERTIARY_VIOLET_RED    = 9;
    this.TERTIARY_BLUE_VIOLET   = 10;
    this.TERTIARY_ORANGE_YELLOW = 11;
    this.TERTIARY_RED_ORANGE    = 12;

    this.mixMap = [];

    // index is R + Y + B
    this.mixMap[1] = this.PRIMARY_BLUE;
    this.mixMap[2] = this.PRIMARY_BLUE;
    this.mixMap[3] = this.PRIMARY_BLUE;
    this.mixMap[4] = this.PRIMARY_BLUE;
    this.mixMap[5] = this.PRIMARY_BLUE;
    this.mixMap[6] = this.PRIMARY_BLUE;

    this.mixMap[10] = this.PRIMARY_YELLOW;
    this.mixMap[11] = this.SECONDARY_GREEN;
    this.mixMap[12] = this.TERTIARY_BLUE_GREEN;
    this.mixMap[13] = this.TERTIARY_BLUE_GREEN;
    this.mixMap[14] = this.TERTIARY_BLUE_GREEN;
    this.mixMap[15] = this.TERTIARY_BLUE_GREEN;
    this.mixMap[20] = this.PRIMARY_YELLOW;
    this.mixMap[21] = this.TERTIARY_YELLOW_GREEN; 
    this.mixMap[22] = this.SECONDARY_GREEN; 
    this.mixMap[23] = this.TERTIARY_BLUE_GREEN; 
    this.mixMap[24] = this.TERTIARY_BLUE_GREEN; 
    this.mixMap[30] = this.PRIMARY_YELLOW;
    this.mixMap[31] = this.TERTIARY_YELLOW_GREEN; 
    this.mixMap[32] = this.TERTIARY_YELLOW_GREEN; 
    this.mixMap[33] = this.SECONDARY_GREEN; 
    this.mixMap[40] = this.PRIMARY_YELLOW;
    this.mixMap[41] = this.TERTIARY_YELLOW_GREEN; 
    this.mixMap[42] = this.TERTIARY_YELLOW_GREEN; 
    this.mixMap[50] = this.PRIMARY_YELLOW;
    this.mixMap[51] = this.TERTIARY_YELLOW_GREEN; 
    this.mixMap[60] = this.PRIMARY_YELLOW;

    this.mixMap[100] = this.PRIMARY_RED;
    this.mixMap[101] = this.SECONDARY_VIOLET;
    this.mixMap[102] = this.TERTIARY_BLUE_VIOLET;
    this.mixMap[103] = this.TERTIARY_BLUE_VIOLET;
    this.mixMap[104] = this.TERTIARY_BLUE_VIOLET;
    this.mixMap[105] = this.TERTIARY_BLUE_VIOLET;
    this.mixMap[110] = this.SECONDARY_ORANGE;
    this.mixMap[111] = this.BLACK;
    this.mixMap[112] = this.BLACK;
    this.mixMap[113] = this.BLACK;
    this.mixMap[114] = this.BLACK;
    this.mixMap[120] = this.TERTIARY_ORANGE_YELLOW;
    this.mixMap[121] = this.BLACK;
    this.mixMap[122] = this.BLACK;
    this.mixMap[123] = this.BLACK;
    this.mixMap[130] = this.TERTIARY_ORANGE_YELLOW;
    this.mixMap[131] = this.BLACK;
    this.mixMap[132] = this.BLACK;
    this.mixMap[140] = this.TERTIARY_ORANGE_YELLOW;
    this.mixMap[141] = this.BLACK;
    this.mixMap[150] = this.TERTIARY_ORANGE_YELLOW;
    this.mixMap[200] = this.PRIMARY_RED;
    this.mixMap[201] = this.TERTIARY_VIOLET_RED;
    this.mixMap[202] = this.SECONDARY_VIOLET;
    this.mixMap[203] = this.TERTIARY_BLUE_VIOLET;
    this.mixMap[204] = this.TERTIARY_BLUE_VIOLET;
    this.mixMap[210] = this.TERTIARY_RED_ORANGE;
    this.mixMap[211] = this.BLACK;
    this.mixMap[212] = this.BLACK;
    this.mixMap[213] = this.BLACK;
    this.mixMap[220] = this.SECONDARY_ORANGE;
    this.mixMap[221] = this.BLACK;
    this.mixMap[222] = this.BLACK;
    this.mixMap[230] = this.TERTIARY_ORANGE_YELLOW;
    this.mixMap[231] = this.BLACK;
    this.mixMap[240] = this.TERTIARY_ORANGE_YELLOW;
    this.mixMap[300] = this.PRIMARY_RED;
    this.mixMap[301] = this.TERTIARY_VIOLET_RED;
    this.mixMap[302] = this.TERTIARY_VIOLET_RED;
    this.mixMap[303] = this.SECONDARY_VIOLET;
    this.mixMap[310] = this.TERTIARY_RED_ORANGE;
    this.mixMap[311] = this.BLACK;
    this.mixMap[312] = this.BLACK;
    this.mixMap[320] = this.TERTIARY_RED_ORANGE;
    this.mixMap[321] = this.BLACK;
    this.mixMap[330] = this.SECONDARY_ORANGE;
    this.mixMap[400] = this.PRIMARY_RED;
    this.mixMap[401] = this.TERTIARY_VIOLET_RED;
    this.mixMap[402] = this.TERTIARY_VIOLET_RED;
    this.mixMap[410] = this.TERTIARY_RED_ORANGE;
    this.mixMap[411] = this.BLACK;
    this.mixMap[420] = this.TERTIARY_RED_ORANGE;
    this.mixMap[500] = this.PRIMARY_RED;
    this.mixMap[501] = this.TERTIARY_VIOLET_RED;
    this.mixMap[510] = this.TERTIARY_RED_ORANGE;
    this.mixMap[600] = this.PRIMARY_RED;

    return this;
};

Game.ColorWheel.prototype.constructor = Game.ColorWheel;

Game.ColorWheel.prototype.getMix = function (colorPoints) {
    return this.mixMap[colorPoints];
};
