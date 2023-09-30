/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package p0052;

import Controller.Manager;
import java.util.ArrayList;
import model.Country;

/**
 *
 * @author hieu9
 */
public class P0052 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        ArrayList<Country> lc = new ArrayList<>();
        //loop until user want to exist
        while (true) {
            int choice = Manager.menu();
            switch (choice) {
                case 1:
                    Manager.inputCountry(lc);
                    break;
                case 2:
                    Manager.printCountry(lc);
                    break;
                case 3:
                    Manager.searchByName(lc);
                    break;
                case 4:
                    Manager.printCountrySorted(lc);
                    break;
                case 5:
                    return;
            }
        }
    }
}
